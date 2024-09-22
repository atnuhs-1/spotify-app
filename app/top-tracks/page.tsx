"use client";

import { Button } from "@/components/ui/button";
import { Track } from "@/types/data";
import Image from "next/image";
import { useEffect, useState } from "react";

type TimeRange = "short_term" | "medium_term" | "long_term";

const item = "tracks";

export default function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("medium_term");

  const handleTimeRange = (timeRange: TimeRange) => {
    setTimeRange(timeRange);
  };

  async function fetchTopTracks(selectedTimeRange: TimeRange) {
    try {
      const response = await fetch(
        `/api/top-items?type=${item}&limit=20&time_range=${selectedTimeRange}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setTracks(data.items || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTopTracks(timeRange);
  }, [timeRange]);

  return (
   <div className="min-h-screen flex bg-red">
      <div className="bg-white p-4 md:p-8 shadow-lg w-full">
        <div className="flex flex-col mb-4 md:grid md:grid-cols-3">
          <div></div>
          <h1 className="text-2xl font-semibold text-center mb-4 md:mb-0">Top Tracks</h1>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4">
            <Button
              variant="outline"
              disabled={timeRange === "short_term"}
              onClick={() => handleTimeRange("short_term")}
              className={`bg-inherit text-black text-sm md:text-base ${
                timeRange === "short_term" ? "bg-slate-950 text-white disabled:opacity-100" : ""
              }`}
            >
              Month
            </Button>
            <Button
              variant="outline"
              disabled={timeRange === "medium_term"}
              onClick={() => handleTimeRange("medium_term")}
              className={`bg-inherit text-black text-sm md:text-base ${
                timeRange === "medium_term" ? "bg-slate-950 text-white disabled:opacity-100" : ""
              }`}
            >
              Half Year
            </Button>
            <Button
              variant="outline"
              disabled={timeRange === "long_term"}
              onClick={() => handleTimeRange("long_term")}
              className={`bg-inherit text-black text-sm md:text-base ${
                timeRange === "long_term" ? "bg-slate-950 text-white disabled:opacity-100" : ""
              }`}
            >
              Year
            </Button>
          </div>
        </div>

        {tracks.length > 0 ? (
          <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-y-20 justify-items-center">
            {tracks.map((track, index) => (
              <li key={index} className="flex flex-col items-center w-full max-w-[160px]">
                {track.album.images.length > 0 && (
                  <Image
                    width={160}
                    height={160}
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="rounded-md w-full h-auto"
                  />
                )}
                <div className="w-full mt-2 md:mt-4">
                  <p className="text-sm md:text-md font-medium truncate">{track.name}</p>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No top tracks found.</p>
        )}
      </div>
    </div>

  );
}
