// import React from "react";
// import useSWRInfinite from "swr/infinite";
// import InfiniteScroll from "react-swr-infinite-scroll";
// import axios from "axios";

// const PAGE_SIZE = 5;
// const sample = () => {
//   let headers = {
//     msisdn: "03035201593",
//     "x-access-token": "SuoeFbuwTiIZY9mBUMMzuw==",
//     app: "cricwick",
//     platform: "web",
//   };
//   const fetcher = (url) =>
//     axios.get(url, { headers: headers }).then((res) => res.data);
//   const swr = useSWRInfinite(
//     (index, prev) =>
//       `http://34.222.208.195:3000/api/v1/match/getCompletedMatches?page=${
//         index + 1
//       }&limit=${PAGE_SIZE}`,
//     {
//       fetcher,
//     }
//   );

//   return (
//     <div className="sm:grid-cols-2 md:grid-cols-2 grid  lg:grid-cols-3">
//       <InfiniteScroll
//         swr={swr}
//         loadingIndicator="... loading ..."
//         endingIndicator="No more data"
//         isReachingEnd={(swr) =>
//           swr?.data?.[swr.data.length - 1]?.data?.matchTeams?.length === 0
//         }
//       >
//         {(response) => {
//           return response?.data?.matchTeams?.map((item, index) => (
//             <div
//               className="items-center m-3 p-4 border rounded-md space-y-2"
//               key={index}
//             >
//               <div className="p-2 text-center">{item?.leagueTitle}</div>
//               <div className="p-2 text-center">{item?.cwMatchId}</div>
//             </div>
//           ));
//         }}
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default sample;

import React from "react";

const sample = () => {
  return <div>sample</div>;
};

export default sample;
