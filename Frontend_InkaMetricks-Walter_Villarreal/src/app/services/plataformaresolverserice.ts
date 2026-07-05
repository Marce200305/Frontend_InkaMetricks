import { Injectable } from '@angular/core';
import { Observable, of, switchMap, map, catchError } from 'rxjs';
import { StreamingPlatformData } from '../models/StreamingPlatformData';
import { Twitchservice } from './twitchservice';
import { Youtubeservice } from './youtubeservice';
import { Kickservice } from './kickservice';

@Injectable({
  providedIn: 'root',
})
export class Plataformaresolverserice {
  constructor(
    private twitch: Twitchservice,
    private youtube: Youtubeservice,
    private kick: Kickservice
  ) {}

  resolve(urlCanal: string): Observable<StreamingPlatformData | null> {
    if (!urlCanal) return of(null);

    const slug = this.extractSlug(urlCanal);

    if (urlCanal.includes('twitch.tv')) {
      return this.twitch.getChannel(slug).pipe(
        map(channel => this.normalizeTwitch(slug, channel, null)),
        catchError(() => of(null))
      );
    }

    if (urlCanal.includes('youtube.com') || urlCanal.includes('youtu.be')) {
      return this.youtube.getChannel(slug).pipe(
        map(data => this.normalizeYoutube(slug, data)),
        catchError(() => of(null))
      );
    }

    if (urlCanal.includes('kick.com')) {
      return this.kick.getChannel(slug).pipe(
        map(data => this.normalizeKick(slug, data)),
        catchError(() => of(null))
      );
    }

    return of(null);
  }

  search(urlCanal: string, query: string): Observable<any[]> {
    if (urlCanal.includes('twitch.tv')) {
      return this.twitch.search(query).pipe(
        map(res => this.extractList(res)),
        catchError(() => of([]))
      );
    }
    if (urlCanal.includes('youtube.com')) {
      return this.youtube.searchChannel(query).pipe(
        map(res => this.extractList(res)),
        catchError(() => of([]))
      );
    }
    if (urlCanal.includes('kick.com')) {
      return this.kick.search(query).pipe(
        map(res => this.extractList(res)),
        catchError(() => of([]))
      );
    }
    return of([]);
  }

  extractSlug(url: string): string {
    try {
      const parts = url.replace(/\/$/, '').split('/');
      return parts[parts.length - 1] || '';
    } catch {
      return '';
    }
  }

  private normalizeTwitch(slug: string, channel: any, stream: any): StreamingPlatformData {
    const user = channel?.data?.user ?? channel?.data ?? channel;
    const streamData = user?.stream ?? null;
    const isLive = streamData != null;
    return {
      plataforma: 'twitch',
      slug,
      displayName: user?.displayName ?? user?.login ?? slug,
      profilePic: user?.profileImageURL ?? '',
      followers: user?.followers?.totalCount ?? 0,
      isLive,
      stream: isLive ? {
        title: user?.broadcastSettings?.title ?? streamData?.title ?? '',
        startedAt: user?.lastBroadcast?.startedAt ?? '',
        viewers: streamData?.viewersCount ?? stream?.viewersCount ?? 0,
        category: streamData?.game?.name ?? ''
      } : undefined
    };
  }

  private normalizeYoutube(slug: string, data: any): StreamingPlatformData {
    const item = data?.items?.[0];
    const stats = item?.statistics;
    const snippet = item?.snippet;
    return {
      plataforma: 'youtube',
      slug,
      displayName: snippet?.title ?? slug,
      profilePic: snippet?.thumbnails?.default?.url ?? '',
      followers: parseInt(stats?.subscriberCount ?? '0'),
      isLive: false,
      stream: undefined,
      country: snippet?.country ?? undefined
    };
  }

  private normalizeKick(slug: string, res: any): StreamingPlatformData {
    const data = res?.data ?? res;
    const isLive = data?.livestream != null;
    return {
      plataforma: 'kick',
      slug,
      displayName: data?.user?.username ?? data?.slug ?? slug,
      profilePic: data?.user?.profilePicture ?? '',
      followers: data?.followersCount ?? 0,
      isLive,
      stream: isLive ? {
        title: data?.livestream?.sessionTitle ?? '',
        startedAt: data?.livestream?.createdAt ?? '',
        viewers: data?.livestream?.viewerCount ?? 0,
        category: data?.livestream?.categories?.[0]?.name ?? ''
      } : undefined
    };
  }

  private extractList(res: any): any[] {
    if (Array.isArray(res)) return res;
    if (res?.data && Array.isArray(res.data)) return res.data;
    if (res?.items && Array.isArray(res.items)) return res.items;
    return [];
  }
}
