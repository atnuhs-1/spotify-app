"use client";

import { auth } from "@/auth";
import { fetchTopItems } from "../lib/data";
import { Artist } from "@/types/data";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type TimeRange = "short_term" | "medium_term" | "long_term";

const item = "artists";

export default function Page() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("medium_term");

  const handleTimeRange = (timeRange: TimeRange) => {
    setTimeRange(timeRange);
  };

  async function fetchTopArtists(selectedTimeRange: TimeRange) {
    try {
      const response = await fetch(
        `/api/top-items?type=${item}&limit=20&time_range=${selectedTimeRange}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setArtists(data.items || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTopArtists(timeRange);
  }, [timeRange]);

  return (
    <div className="min-h-screen flex bg-red">
      <div className="bg-white p-4 md:p-8 shadow-lg  w-full">
        <div className="flex flex-col mb-4 md:grid md:grid-cols-3">
          <div></div>
          <h1 className="text-2xl font-semibold text-center mb-4 md:mb-0">Top Artists</h1>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4">
            <Button
              variant="outline"
              disabled={timeRange === "short_term"}
              onClick={() => handleTimeRange("short_term")}
              className={`bg-inherit text-black ${
                timeRange === "short_term" ? "bg-slate-950 text-white disabled:opacity-100" : ""
              }`}
            >
              Month
            </Button>
            <Button
              variant="outline"
              disabled={timeRange === "medium_term"}
              onClick={() => handleTimeRange("medium_term")}
              className={`bg-inherit text-black ${
                timeRange === "medium_term" ? "bg-slate-950 text-white disabled:opacity-100" : ""
              }`}
            >
              Half Year
            </Button>
            <Button
              variant="outline"
              disabled={timeRange === "long_term"}
              onClick={() => handleTimeRange("long_term")}
              className={`bg-inherit text-black ${
                timeRange === "long_term" ? "bg-slate-950 text-white disabled:opacity-100" : ""
              }`}
            >
              Year
            </Button>
          </div>
        </div>
        {artists.length > 0 ? (
          <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-y-20 justify-items-center">
            {artists.map((artist, index) => (
              <li key={index} className="flex flex-col items-center w-full max-w-[160px]">
                {artist.images.length > 0 && (
                  <Image
                    width={160}
                    height={160}
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="rounded-md h-[160px] object-cover"
                  />
                )}
                <div className="w-full mt-2 md:mt-4">
                  <p className="text-sm md:text-md font-medium truncate">{artist.name}</p>
                  {/* <p className="text-gray-500">{artist.artists.map(artist => artist.name).join(', ')}</p> */}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No top artists found.</p>
        )}
      </div>
    </div>
  );
}
