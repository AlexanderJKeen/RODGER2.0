import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: '100%'}}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image 
              source={images.cards}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image 
              source={images.logo}
              className="max-w--[380px] w-full h-[300px] mt-9"
              resizeMode="contain"
            />
            <View className="relative mt-9">
              <Text className="text-3xl text-white font-bold text-center font-pregular">
                Book your desk with{' '}
                <Text className="text-secondary-200">RODGER</Text>
              </Text>
            </View>
            <Text className="text-sm text-gray-100 mt-9 text-center">The futer of Sykes HotDesking</Text>

            <CustomButton 
              title="Continue"
              handlePress={() => router.push('/home')}
              containerStyles="w-full mt-9"
            />

          </View>
        </ScrollView>

        <StatusBar 
          backgrouinsColor='#161622'
          style='light'
        />
    </SafeAreaView>
  );
}  