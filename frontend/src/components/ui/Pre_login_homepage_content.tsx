
import Loremcontent from "./loremcontent"


const Pre_login_homepage_content = () => {
  return (
    <>
       <div className="Pre_login_homepage_content h-screen w-fit pl-10 pt-10 contain-content ">
        <div className=" h-screen w-fit">
        <h1 className="text-7xl text-[#496729]">
            YOUR ULTIMATE 
            <h2>
                <span className="text-[#fff]"><i> Guide </i> </span>
            </h2>
            FOR ALL KIND OF TRIPS.
            
        </h1>

        <Loremcontent/>

        {/* <Button>Button</Button> */}


        </div>
       </div>
    
    </>
  )
}

export default Pre_login_homepage_content