import { Image, useColorScheme} from 'react-native'

//images 
import DarkLogo from '../assets/img/darklogo.png'
import LightLogo from '../assets/img/logo.png'

const ThemedLogo = ({...props}) => {
    const colorScheme = useColorScheme()
    const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

    return (
        <Image source = {logo} {...props}/>
    )
}

export default ThemedLogo