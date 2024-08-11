import Scrollslider from '../components/ui/scrollslider'
import Loremcontent from '../components/ui/loremcontent'
import Pre_login_menubar from '../components/ui/pre_login_menubar'
import App from '../App.tsx'


const Pre_login_homepage = () => {
  return (
    <>
        <div className='flex justify-center align-middle'>
        <Scrollslider/>
        <Pre_login_menubar/>
        <Loremcontent/>
        <App/>

        </div>

    </>
  )
}

export default Pre_login_homepage