import CommonComponent from "./CommonComponent";
import { useState } from "react";

const MyRegularSpon=()=>{

    const [selectedSort, setSelectedSort] =useState("latest");
    const [selectSpon, setSelectSpon] =useState("ing");
    const [data,setData] = useState([]);

    const handleSelectChange = (choose) => {
        setSelectSpon(choose);
      };
    
    const handleSortChange = (sortkey)=>{
        setSelectedSort(sortkey);
        
    }

    return(
        <div className="grid grid-row-3 gap-4">
            <CommonComponent />
            <div className="w-full bg-white p-6 row-span-2 shadow-md rounded">
                <div className="flex items-center justify-between mt-3 mb-4 gap-2">
                    <h1 className="font-black text-3xl">정기 후원</h1>
                    {/* <input type="text" placeholder="검색어를 입력해주세요" className="shadow-sm w-[400px] p-2 placeholder:text-gray-500 placeholder:italic"/> */}
                    <div className="flex items-center gap-3">
                        <input type="date" className="p-2 border border-gray-200 shadow-sm w-[130px]"/>
                        <span>-</span>
                        <input type="date" className="p-2 border border-gray-200 shadow-sm w-[130px]"/>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <button
                        onClick={() => handleSortChange("latest")}
                        className={`px-2 py-1 text-sm cursor-pointer ${
                          selectedSort === "latest" ? "font-bold text-black" : "text-gray-500"
                        }`}
                        >최신순</button>
                        <span className="text-xs text-gray-300">|</span>
                        <button
                         onClick={() => handleSortChange("oldest")}
                         className={`px-2 py-1 text-sm cursor-pointer ${
                           selectedSort === "oldest" ? "font-bold text-black" : "text-gray-500"
                         }`}
                        >과거순</button>
                        <span className="text-xs text-gray-300">|</span>
                        <button
                         onClick={() => handleSortChange("high")}
                         className={`px-2 py-1 text-sm cursor-pointer ${
                           selectedSort === "high" ? "font-bold text-black" : "text-gray-500"
                         }`}
                        >금액높은순</button>
                        <span className="text-xs text-gray-300">|</span>
                        <button
                         onClick={() => handleSortChange("low")}
                         className={`px-2 py-1 text-sm cursor-pointer ${
                           selectedSort === "low" ? "font-bold text-black" : "text-gray-500"
                         }`}
                        >금액낮은순</button>
                    </div>
                </div> 
                <hr />

                <div className="flex w-full items-center justify-center my-5">
                    <button 
                    onClick={()=> handleSelectChange("ing")}
                    className={`p-3 cursor-pointer w-[50%]
                        ${selectSpon=== "ing" ? "text-white bg-red-500" : "text-gray-400 bg-white shadow-md border border-gray-200"}
                        `}
                    >후원중</button>
                    <button
                    onClick={()=> handleSelectChange("ed")}
                    className={`p-3 cursor-pointer w-[50%]
                        ${selectSpon==="ed" ? "text-white bg-red-500" : "text-gray-400 bg-white shadow-md border border-gray-200"}
                        `}
                    >후원 종료</button>
                </div>

                <hr />
                <table className="w-full">
                    <thead>
                        <tr className="h-[55px]">
                        <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                            No
                        </th>
                        <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                            후원분야
                        </th>
                        <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                            후원시작일
                        </th>
                        <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                            후원내역
                        </th>
                        <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                            후원금액
                        </th>
                        <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                            후원상태
                        </th>
                        <th className="border-x border-b border-gray-200 bg-gray-100 px-4 py-2 text-sm text-black font-bold">
                            다음결제일
                        </th>
                        </tr>
                    </thead>

                    {/* 조건부 렌더링 */}
                    {data.length === 0 ? (
                        <tbody>
                        <tr>
                            <td colSpan="7" className="text-center text-black py-10 font-bold h-[278px]">
                            후원 내역이 없습니다.
                            </td>
                        </tr>
                        </tbody>
                    ) : (
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="text-center">
                            <td className="border px-4 py-2 text-sm">{item.no}</td>
                            <td className="border px-4 py-2 text-sm">{item.category}</td>
                            <td className="border px-4 py-2 text-sm">{item.startDate}</td>
                            <td className="border px-4 py-2 text-sm">{item.details}</td>
                            <td className="border px-4 py-2 text-sm">{item.amount}</td>
                            <td className="border px-4 py-2 text-sm">{item.status}</td>
                            <td className="border px-4 py-2 text-sm">{item.nextPayment}</td>
                            </tr>
                        ))}
                        </tbody>
                    )}
                    </table>

                <hr />

                    
                <div className="flex justify-center mt-6">
                    <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
                    &lt;&lt;
                    </button>
                    <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
                    1
                    </button>
                    <button className="px-3 py-1 mx-1 border rounded text-gray-500 hover:bg-gray-100">
                    &gt;&gt;
                    </button>
                </div>


            </div>

        </div>
    )
}
export default MyRegularSpon;