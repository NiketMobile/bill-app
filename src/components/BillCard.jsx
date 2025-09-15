import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import React from 'react';
import { images } from '../constant/images';
import { scale } from '../utils/appScale';
import { colors } from '../constant/colors';

const { width } = Dimensions.get('window');

export default function BillCard({
  item,
  swipe,
  openModal,
  isBookmarked = false,
  isLoved = false,
  onBookmark,
  onLove,
  ...panHandlers
}) {
  if (!item) return null;

  const formatBillNumber = bill => {
    return bill.bill_number
      ? `${bill.bill_type.toUpperCase()} ${bill.bill_number}`
      : 'N/A';
  };

  const formatDate = dateString => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [
            { translateX: swipe.x },
            { translateY: swipe.y },
            {
              rotate: swipe.x.interpolate({
                inputRange: [-width, 0, width],
                outputRange: ['-30deg', '0deg', '30deg'],
              }),
            },
          ],
        },
      ]}
      {...panHandlers}
    >
      <View style={styles.billHolder}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title || 'No Title Available'}
          </Text>
          <View style={styles.statusWrapper}>
            <Image source={images.approved} style={styles.statusIcon} />
          </View>
        </View>

        {/* Subheader */}
        <View style={styles.subHeader}>
          <Text style={styles.text}>{item.state || 'N/A'}</Text>
          <Text style={styles.billNumber}>{formatBillNumber(item)}</Text>
        </View>

        <Text style={styles.chamber}>{item.chamber || 'N/A'}</Text>

        {/* Meta info */}
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Image source={images.date} style={styles.metaIcon} />
            <Text style={styles.metaText}>{formatDate(item.status_date)}</Text>
          </View>

          <View style={styles.metaItem}>
            <Image source={images.id} style={styles.metaIcon} />
            <Text style={styles.metaText}>
              {item.sponsors?.[0]?.name || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text
          style={styles.description}
          numberOfLines={30}
          ellipsizeMode="tail"
        >
          {item.description || 'No description available'}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable
            onPress={e => {
              e.stopPropagation();
              openModal();
            }}
            style={styles.expandButton}
          >
            <Text style={styles.expandText}>Expand bill</Text>
            <Image source={images.expnad} style={styles.expandIcon} />
          </Pressable>

          <View style={styles.actionButtons}>
            <Pressable
              style={[
                styles.smallButton,
                { borderColor: '#ddd', borderWidth: scale(1) },
              ]}
              onPress={e => {
                e.stopPropagation();
                onLove(item.bill_id);
              }}
            >
              <Image
                source={images.heart}
                style={[
                  styles.actionIcon,
                  { tintColor: isLoved ? 'red' : '#050A20' },
                ]}
              />
            </Pressable>
            <Pressable
              style={[styles.smallButton, { backgroundColor: '#050A20' }]}
              onPress={e => {
                e.stopPropagation();
                onBookmark(item.bill_id);
              }}
            >
              <Image
                source={images.bookmark}
                style={[styles.actionIcon, { tintColor: '#fff' }]}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: width - scale(32),
    position: 'absolute',
    alignSelf: 'center',
    top: scale(20),
  },
  billHolder: {
    padding: scale(20),
    borderRadius: scale(12),
    backgroundColor: '#fff',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: scale(8),
    shadowOffset: { width: 0, height: scale(4) },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(12),
    alignItems: 'flex-start',
  },
  title: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#050A20',
    flex: 1,
    marginRight: scale(10),
  },
  statusWrapper: {
    backgroundColor: '#F5F6FA',
    borderRadius: scale(20),
    padding: scale(6),
  },
  statusIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(6),
  },
  text: {
    fontSize: scale(14),
    color: '#050A20',
  },
  billNumber: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#050A20',
  },
  chamber: {
    fontSize: scale(13),
    fontWeight: '400',
    marginBottom: scale(8),
    color: '#666',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  metaIcon: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain',
  },
  metaText: {
    fontSize: scale(12),
    color: '#777',
  },
  description: {
    fontSize: scale(13),
    color: '#141C46',
    lineHeight: scale(20),
    marginBottom: scale(16),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.seleted_text_v1,
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: scale(8),
  },
  expandText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#fff',
    marginRight: scale(6),
  },
  expandIcon: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: scale(10),
  },
  smallButton: {
    height: scale(36),
    width: scale(36),
    borderRadius: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
  },
});
