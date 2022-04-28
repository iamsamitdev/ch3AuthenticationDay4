import React, {useState, useEffect, useMemo} from 'react'
import { View, ActivityIndicator } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'

// Import Auth Context
import { AuthContext } from './../store/Context'

import Home from './../screens/Home'

const Navigation = () => {

  // สร้างตัวแปรแบบ State ไว้เก็บสถานะการ Loading 
  const [isLoading, setIsLoading] = useState(true)

  // สร้างตัวแปร State ไว้ทดสอบเก็บ Token
  const [userToken, setUserToken] = useState(null)

  // เรียกใช้ useEffect เพื่อเรียกทำงานฟังก์ชัน Loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // เพิ่มการใช้งาน useMemo เก็บค่าฟังก์ชันและตัวแปรต่างๆ ไว้ เมื่อโหลด component ครั้งแรก
  const authContextValue = useMemo(()=>({
    signIn: ()=>{
      setUserToken('asdf')
      setIsLoading(false)
    },
    signUp: ()=>{
      setUserToken('abcd')
      setIsLoading(false)
    },
    signOut: ()=>{
      setUserToken(null)
      setIsLoading(false)
    },
  }),[])

  // ลองเรียกดู userToken
  console.log(userToken)
  
  // แสดง loading ขึ้นมา
  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        {
          userToken !== null ? <Home />: <AuthNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Navigation