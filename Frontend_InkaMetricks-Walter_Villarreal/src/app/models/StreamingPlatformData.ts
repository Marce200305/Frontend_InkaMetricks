export interface StreamData {
  title: string;
  startedAt: string;
  viewers: number;
  category: string;
}

export interface StreamingPlatformData {
  plataforma: 'twitch' | 'youtube' | 'kick';
  slug: string;
  displayName: string;
  profilePic: string;
  followers: number;
  isLive: boolean;
  stream?: StreamData;
  country?: string;
}