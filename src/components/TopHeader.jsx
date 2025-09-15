import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
// import FontAwesome from "@expo/vector-icons/FontAwesome";
import { images } from '../constant/images';
import { scale } from '../utils/appScale';
import { colors } from '../constant/colors';

const TopHeader = ({ onPressSearch, onPressFilter }) => {
  // const router = useRouter();
  const onPress = () => { };


  return (
    <View style={styles.top_header}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <TouchableOpacity onPress={onPressFilter} style={styles.small_btn_rounder}>
          {/* <FontAwesome name="sliders" size={16} color="black" /> */}
          <Image source={images.filter} style={styles.icon} tintColor={colors.black} />
        </TouchableOpacity>
      </View>

      <Image
        source={images.logo}
        style={{
          width: 120,
          height: 40,
          resizeMode: 'contain',
          marginLeft: 40,
        }}
      />

      <View style={{ flexDirection: 'row', gap: 4 }}>
        <TouchableOpacity
          style={styles.small_btn_rounder}
          onPress={onPressSearch}
        >
          <Image
            source={images.search}
            style={[styles.icon, { tintColor: '#000' }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.small_btn_rounder,
            {
              marginLeft: scale(8),
            },
          ]}
        >
          <Image
            source={images.notification}
            style={[styles.icon, { tintColor: '#000' }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  top_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  small_btn_rounder: {
    height: scale(38),
    width: scale(38),
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  billHolder: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  icon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    tintColor: colors.theme_v1,
  },
});
