import FindYourWayLeft from "./FindYourWayLeft";
import FindYourWayRight from "./FindYourWayRight";

const FindYourWay = () => {
    return (
        <div className="w-full min-h-fit p-4 sm:p-6 md:p-10 flex flex-col lg:flex-row items-center justify-center gap-2">
            <FindYourWayLeft />
            <FindYourWayRight />
        </div>
    )
}

export default FindYourWay;

