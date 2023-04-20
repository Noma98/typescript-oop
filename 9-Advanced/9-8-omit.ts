{
  //Omit: 기존 타입에서 특정 속성들만 제외시키기
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };
  type VideoMetadata = Omit<Video, 'url' | 'data'>;
  //Pick과 달리 Omit은 type Omit<T, K extends keyof any>여서 T 타입의 key 타입이 아닌 다른 것도 지정 가능함

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://..',
      data: 'byte-data..',
    };
  }
  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id,
      title: 'title',
    };
  }
}
