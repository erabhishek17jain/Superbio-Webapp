import SocialCard from "@/components/SocialCard";
import { IColumn } from "@/services/sheet.service";
import React, { RefObject } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ISummary {
    totCount: number;
    count: number;
    icon: JSX.Element;
    color: string;
    title: string;
    basedOn: number | JSX.Element;
  }

interface IPDFHandlerProps {
  bodyRef: RefObject<HTMLDivElement>;
  isPublic: boolean | undefined;
  summary: ISummary[];
  pdfColumns: IColumn[];
}

export default function PDFHandler({
  bodyRef,
  isPublic,
  summary,
  pdfColumns,
}: IPDFHandlerProps) {
  return (
    <div className="hidden" id="pdf-download">
      <section ref={bodyRef}>
        <span className="flex w-full text-lg font-bold justify-center mt-8 mb-2">
          Campaign LIVE Reporting
        </span>
        <div className="flex mx-4">
          <div className="flex w-full flex-col ">
            <div
              className={`mt-3 sm:mt-6 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-${
                isPublic ? "2" : "3"
              } w-full gap-4`}
            >
              {summary?.length > 0 &&
                summary.map((item: any) => (
                  <div
                    key={uuidv4()}
                    className={`flex justify-start flex-col sm:justify-center sm:py-4 ${item.color} w-full px-4 py-4 sm:px-4 mx-auto sm:mx-0 rounded-xl bg-opacity-20`}
                  >
                    <div className="flex gap-2 justify-between sm:w-auto">
                      <div
                        className={`flex items-center justify-center ${item.color} bg-opacity-60 w-10 h-10 mr-3 rounded-full`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex gap-2">
                        <p className="text-2xl text-black-100">{item?.count}</p>
                      </div>
                    </div>
                    <div className="flex mr-3 h-9 items-end justify-between w-full">
                      <p className="text-md text-black-500 capitalize">
                        {item.title}
                      </p>
                      <p className="text-md text-black-300 text-[#8b8b8b]">
                        {item.basedOn}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 my-4 mx-4">
          {pdfColumns.map((item, index: number) => (
            <SocialCard
              key={"socialCard" + index}
              item={item}
              isPublic={isPublic ? isPublic : false}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
