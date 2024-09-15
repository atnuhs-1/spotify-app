export type Track = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
};

export type Artist = {
  name: string;
  popularity: number;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  genres: [];
};
