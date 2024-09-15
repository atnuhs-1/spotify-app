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
      <div className="bg-white p-8  shadow-lg  w-full">
        <div className="grid grid-cols-3 mb-4">
          <div></div>
          <h1 className="text-2xl font-semibold text-center">Top Tracks</h1>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              disabled={timeRange === "short_term"}
              onClick={() => handleTimeRange("short_term")}
              className={`bg-inherit text-black ${
                timeRange === "short_term" ? "bg-slate-950 text-white" : ""
              }`}
            >
              Month
            </Button>
            <Button
              variant="outline"
              disabled={timeRange === "medium_term"}
              onClick={() => handleTimeRange("medium_term")}
              className={`bg-inherit text-black ${
                timeRange === "medium_term" ? "bg-slate-950 text-white" : ""
              }`}
            >
              Half Year
            </Button>
            <Button
              variant="outline"
              disabled={timeRange === "long_term"}
              onClick={() => handleTimeRange("long_term")}
              className={`bg-inherit text-black ${
                timeRange === "long_term" ? "bg-slate-950 text-white" : ""
              }`}
            >
              Year
            </Button>
          </div>
        </div>

        {tracks.length > 0 ? (
          <ol className="grid grid-cols-6 gap-y-20 justify-items-center">
            {tracks.map((track, index) => (
              <li key={index} className="flex flex-col items-center w-[160px]">
                {track.album.images.length > 0 && (
                  <Image
                    width={160}
                    height={160}
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="rounded-md"
                  />
                )}
                <div className="w-full mt-4">
                  <p className="text-md font-medium truncate">{track.name}</p>
                  <p className="text-gray-500">
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
