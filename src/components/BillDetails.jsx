import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  ViewProps,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import BillDescription from './BillDescription';
// import BillCharts from './BillCharts';
// import BillSponser from './BillSponser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constant/images';
import { colors } from '../constant/colors';
import { fontScale, moderateScale, moderateVerticalScale, scale } from '../utils/appScale';
import { fonts } from '../constant/fonts';
import BillCharts from './BillCharts';
import BillSponser from './BillSponser';

// type BillDetailsProps = {
//   setIsModalVisible: (visible: boolean) => void,
//   bill: any,
//   isBookmarked: boolean,
//   isLoved: boolean,
//   onBookmark: (billId: string) => void,
//   onLove: (billId: string) => void,
// } & ViewProps;

const BillDetails = ({
  setIsModalVisible,
  bill,
  isBookmarked,
  isLoved,
  onBookmark,
  onLove,
  ...rest
}) => {
  const [isActiveDescription, setIsActiveDescription] = useState(true);
  const [isActiveChart, setIsActiveChart] = useState(false);
  const [isActiveSponser, setIsActiveSopnser] = useState(false);

  const formatBillNumber = bill => {
    if (!bill?.bill_number) return 'N/A';
    return `${bill.bill_type?.toUpperCase() || ''} ${bill.bill_number}`;
  };

  console.log('bill--->', JSON.stringify(bill, null, 2))


  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const activeDescription = () => {
    setIsActiveDescription(true);
    setIsActiveChart(false);
    setIsActiveSopnser(false);
  };

  const activeChart = () => {
    setIsActiveChart(true);
    setIsActiveDescription(false);
    setIsActiveSopnser(false);
  };

  const activeSponser = () => {
    setIsActiveSopnser(true);
    setIsActiveDescription(false);
    setIsActiveChart(false);
  };

  if (!bill) return null;

  const steps = [
    { title: 'Introduced' },
    { title: 'Passed house' },
    { title: 'Passed senate' },
    { title: 'Signed into law' }, // fixed typo “Singed”
  ];

  const currentStep = 1; // index of the active step


  return (
    <View
      style={{ flex: 1 }}
    >
      <View
        style={{ paddingBottom: 100, paddingHorizontal: scale(15) }}
      >
        {/* Modal drag handle */}
        {/* <View style={styles.modalHandleContainer}>
          <Pressable
            style={styles.modalHandle}
            onPress={() => setIsModalVisible(false)}
          />
        </View> */}
        {/* Header with title and status */}


        <View style={styles.header}>
          <Text style={styles.title}>{bill.title || 'No Title Available'}</Text>
          <View style={styles.checkView}>
            <Image source={images.approved} style={styles.statusIcon} />
          </View>
        </View>

        {/* Bill metadata */}
        <View style={styles.metaRow}>
          {/* <Text style={styles.metaText}>{bill.state || 'N/A'}</Text> */}
          <Text style={styles.metaText}>{'Pennsylvania'}</Text>
          <Text style={styles.billNumber}>{formatBillNumber(bill)}</Text>
        </View>

        {/* <Text style={styles.chamber}>{"bill.chamber" || 'N/A'}</Text> */}
        <View style={{
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(4),
          backgroundColor: colors.text_v1,
          alignSelf: 'flex-start',
          borderRadius: 15
        }}>
          <Text style={styles.chamber}>{"House of Representatives" || 'N/A'}</Text>
        </View>

        <View style={styles.dateSponsorRow}>
          <View style={styles.metaItem}>
            {/* <FontAwesome name="calendar" size={16} color="#A7ACC5" /> */}
            <Image source={images.calender} style={styles.icons} />
            <Text style={[styles.metaText, {
              color: colors.theme_v1,
            }]}>{formatDate(bill.status_date)}</Text>
          </View>

          <View style={styles.metaItem}>
            {/* <FontAwesome name="vcard-o" size={16} color="#A7ACC5" /> */}
            <Image source={images.id} style={styles.icons} />
            <Text style={[styles.metaText, {
              color: colors.theme_v1,
            }]}>
              {bill.sponsors?.[0]?.name || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={activeDescription}
            style={[styles.tabButton, isActiveDescription && styles.activeTabButton]}
          >
            <Text style={isActiveDescription ? styles.activeTabText : styles.inactiveTabText}>
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={activeChart}
            style={[styles.tabButton, isActiveChart && styles.activeTabButton]}
          >
            <Text style={isActiveChart ? styles.activeTabText : styles.inactiveTabText}>
              Insights
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={activeSponser}
            style={[styles.tabButton, isActiveSponser && styles.activeTabButton]}
          >
            <Text style={isActiveSponser ? styles.activeTabText : styles.inactiveTabText}>
              Sponsors
            </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.containers}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <View key={step.title} style={styles.stepContainer}>
                {/* Circle */}
                <View
                  style={[
                    styles.circle,
                    isActive && styles.circleActive,
                    isCompleted && styles.circleCompleted,
                  ]}
                >
                  {isCompleted || isActive ? (
                    <Text style={styles.check}>✓</Text>
                  ) : null}
                </View>

                {/* Label */}
                <Text
                  style={[
                    styles.label,
                    isActive && styles.labelActive,
                  ]}
                >
                  {step.title}
                </Text>

                {/* Line (only after circle, not last step) */}
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      isCompleted && styles.lineCompleted,
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>


        {/* Content area */}
        <View style={styles.contentArea}>
          {isActiveDescription && (
            <BillDescription description={bill.description} />
          )}
          {isActiveChart && <BillCharts bill={bill} />}
          {isActiveSponser && <BillSponser sponsors={bill.sponsors} />}
        </View>

      </View>

      {/* <View style={styles.bottomActions}>
        <Pressable
          style={styles.closeButton}
          onPress={() => setIsModalVisible(false)}
        >
        </Pressable>

        <View style={styles.actionButtons}>
          <Pressable
            style={[styles.actionButton, styles.loveButton]}
            onPress={() => {
              onLove(bill.bill_id);
              console.log('loved and closed');
              setIsModalVisible(false);
            }}
          >
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.bookmarkButton]}
            onPress={() => {
              onBookmark(bill.bill_id);
              console.log('Bookmarked and close');
              setIsModalVisible(false);
            }}
          >
          </Pressable>
        </View>
      </View> */}
    </View >
  );
};

const styles = StyleSheet.create({
  modalHandleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalHandle: {
    height: 5,
    width: 54,
    borderRadius: 5,
    backgroundColor: '#BFC4E0',
    opacity: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: fontScale(20),
    fontWeight: '600',
    fontFamily: fonts.semiBold,
    color: colors.text,
    maxWidth: '80%',
  },
  checkView: {
    padding: 5,
    backgroundColor: colors.bg_v1,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statusIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metaText: {
    fontSize: moderateScale(14),
    color: colors.text,
    fontWeight: '500',
    fontFamily: fonts.regular,
  },
  billNumber: {
    fontSize: moderateScale(16),
    color: colors.text,
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  chamber: {
    fontSize: moderateScale(13),
    color: colors.white,
    fontFamily: fonts.regular,
    fontWeight: '400',
    textAlign: 'center',
  },
  dateSponsorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "60%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  activeTabButton: {
    borderBottomColor: 'transparent',
    backgroundColor: colors.themeColor,
  },
  activeTabText: {
    color: colors.bg_v1,
    fontWeight: '500',
    fontSize: fontScale(14),
    fontFamily: fonts.regular
  },
  inactiveTabText: {
    color: colors.tab_disabled,
    fontWeight: '400',
    fontSize: fontScale(14),
    fontFamily: fonts.regular
  },
  tabButton: {
    height: moderateVerticalScale(35),
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  contentArea: {
    minHeight: 200,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  closeButton: {
    padding: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loveButton: {
    backgroundColor: 'rgba(255, 230, 239, 0.5)',
  },
  bookmarkButton: {
    backgroundColor: 'rgba(161, 177, 255, 0.3)',
  },
  icons: {
    width: scale(22),
    height: scale(22),
    resizeMode: "contain",
    tintColor: colors.theme_v1
  },

  // 

  circle: {
    width: 27,
    height: 27,
    borderRadius: 50,
    backgroundColor: '#CBD5E1', // light gray
    alignItems: 'center',
    justifyContent: 'center',
  },
  containers: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: moderateVerticalScale(20),
  },
  stepContainer: {
    alignItems: 'center', // ⬅️ centers circle + text vertically
    flexDirection: 'row',
  },
  circleActive: {
    backgroundColor: colors.themeColor,
  },
  circleCompleted: {
    backgroundColor: colors.themeColor,
  },
  check: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
  label: {
    fontSize: fontScale(10),
    fontFamily: fonts.regular,
    fontWeight: "400",
    top: 25,
    color: colors.theme_v1,
    textAlign: 'center',
    marginTop: 6,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    left: -13,
  },
  labelActive: {
    color: colors.themeColor,
    fontWeight: '600',
  },
  line: {
    width: scale(50),
    height: 1,
    backgroundColor: colors.theme_v1,
    marginTop: 3,
  },
  lineCompleted: {
    backgroundColor: colors.themeColor,
  },

});

export default BillDetails;
