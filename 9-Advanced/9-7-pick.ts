{
  //Pick: 기존 타입에서 원하는 속성들만 뽑기
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };
  type VideoMetadata = Pick<Video, 'id' | 'title'>;

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
