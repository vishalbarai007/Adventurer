import Scrollslider from '../components/ui/scrollslider'
// import Loremcontent from '../components/ui/loremcontent'
// import Pre_login_menubar from '../components/ui/pre_login_menubar'
import Parallax from '../components/ui/Parallax'
import Pre_login_homepage_content from '../components/ui/Pre_login_homepage_content'
import Pre_homepage_cards from '../components/ui/Pre_homepage_cards'
import ImageGallery from '../components/ui/ImageGallery'



const Pre_login_homepage = () => {
  return (
    <>
        <Parallax/>
        <Scrollslider/>
        {/* <Pre_login_menubar/> */}
        <Pre_login_homepage_content/>
        <ImageGallery/>
        <Pre_homepage_cards/>
        {/* <ImageGallery/> */}
       

       

    </>
  )
}

export default Pre_login_homepage