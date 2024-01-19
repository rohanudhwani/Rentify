import {
  Image,
  View,
  Dimensions,
  Text,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item}) => {
  const modWidth = width - 40;

  return (
    <View style={{width:modWidth, height:300, alignItems: 'center', overflow: 'hidden', borderRadius:30, }}>
      <Image
        source={item.img}
        resizeMode="cover"
        style={{width: '100%', height: '100%' }}
      />
    </View>
  );
};

export default SlideItem;



