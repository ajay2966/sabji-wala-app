import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { AuthParamList } from '../navigation/AuthStack';
import Input from '../components/Input';
import Button from '../components/Button';
type Props = NativeStackScreenProps<AuthParamList, 'Register'>;
const citiesByState: Record<string, string[]> = {
  'Andaman and Nicobar Islands': ['Port Blair'],
  'Andhra Pradesh': ['Adoni', 'Amaravati', 'Anantapur', 'Chittoor', 'Eluru', 'Guntur', 'Kadapa', 'Kakinada', 'Kurnool', 'Nellore', 'Rajahmundry', 'Tirupati', 'Vijayawada', 'Visakhapatnam', 'Vizianagaram'],
  'Arunachal Pradesh': ['Itanagar'],
  Assam: ['Dhuburi', 'Dibrugarh', 'Dispur', 'Guwahati', 'Jorhat', 'Nagaon', 'Sivasagar', 'Silchar', 'Tezpur', 'Tinsukia'],
  Bihar: ['Ara', 'Begusarai', 'Bettiah', 'Bhagalpur', 'Bihar Sharif', 'Bodh Gaya', 'Buxar', 'Chapra', 'Darbhanga', 'Gaya', 'Hajipur', 'Katihar', 'Madhubani', 'Motihari', 'Munger', 'Muzaffarpur', 'Patna', 'Purnia', 'Saharsa', 'Samastipur', 'Sasaram', 'Sitamarhi', 'Siwan'],
  Chandigarh: ['Chandigarh'],
  Chhattisgarh: ['Ambikapur', 'Bhilai', 'Bilaspur', 'Dhamtari', 'Durg', 'Jagdalpur', 'Raipur', 'Rajnandgaon'],
  Delhi: ['Delhi', 'New Delhi'],
  Goa: ['Madgaon', 'Panaji'],
  Gujarat: ['Ahmadabad', 'Amreli', 'Bharuch', 'Bhavnagar', 'Bhuj', 'Dwarka', 'Gandhinagar', 'Godhra', 'Jamnagar', 'Junagadh', 'Kandla', 'Khambhat', 'Kheda', 'Mahesana', 'Morbi', 'Nadiad', 'Navsari', 'Palanpur', 'Patan', 'Porbandar', 'Rajkot', 'Surat', 'Surendranagar', 'Valsad', 'Veraval'],
  Haryana: ['Ambala', 'Bhiwani', 'Chandigarh', 'Faridabad', 'Gurugram', 'Hansi', 'Hisar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat'],
  'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Dalhousie', 'Dharmshala', 'Hamirpur', 'Kangra', 'Kullu', 'Mandi', 'Nahan', 'Shimla', 'Una'],
  'Jammu and Kashmir': ['Anantnag', 'Baramula', 'Doda', 'Gulmarg', 'Jammu', 'Kathua', 'Punch', 'Rajouri', 'Srinagar', 'Udhampur'],
  Jharkhand: ['Bokaro', 'Chaibasa', 'Deoghar', 'Dhanbad', 'Dumka', 'Giridih', 'Hazaribag', 'Jamshedpur', 'Jharia', 'Ranchi', 'Saraikela'],
  Karnataka: ['Badami', 'Ballari', 'Bengaluru', 'Belagavi', 'Bidar', 'Chikkamagaluru', 'Chitradurga', 'Davangere', 'Hassan', 'Hubballi-Dharwad', 'Kalaburagi', 'Kolar', 'Madikeri', 'Mandya', 'Mangaluru', 'Mysuru', 'Raichur', 'Shivamogga', 'Tumakuru', 'Vijayapura'],
  Kerala: ['Alappuzha', 'Idukki', 'Kannur', 'Kochi', 'Kollam', 'Kottayam', 'Kozhikode', 'Palakkad', 'Thalassery', 'Thiruvananthapuram', 'Thrissur', 'Vatakara'],
  Ladakh: ['Kargil', 'Leh'],
  'Madhya Pradesh': ['Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dr. Ambedkar Nagar (Mhow)', 'Guna', 'Gwalior', 'Hoshangabad', 'Indore', 'Itarsi', 'Jabalpur', 'Jhabua', 'Khajuraho', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsimhapur', 'Neemuch', 'Nowgong', 'Orchha', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Ujjain', 'Vidisha'],
  Maharashtra: ['Ahmadnagar', 'Akola', 'Amravati', 'Aurangabad', 'Bhandara', 'Bhusawal', 'Bid', 'Buldhana', 'Chandrapur', 'Dhule', 'Jalgaon', 'Kalyan', 'Kolhapur', 'Mahabaleshwar', 'Malegaon', 'Mumbai', 'Nagpur', 'Nanded', 'Nashik', 'Osmanabad', 'Pandharpur', 'Parbhani', 'Pune', 'Ratnagiri', 'Sangli', 'Satara', 'Solapur', 'Thane', 'Ulhasnagar', 'Vasai-Virar', 'Wardha', 'Yavatmal'],
  Manipur: ['Imphal'],
  Meghalaya: ['Cherrapunji', 'Shillong'],
  Mizoram: ['Aizawl', 'Lunglei'],
  Nagaland: ['Kohima', 'Mon', 'Phek', 'Wokha', 'Zunheboto'],
  Odisha: ['Balangir', 'Baleshwar', 'Baripada', 'Bhubaneshwar', 'Brahmapur', 'Cuttack', 'Dhenkanal', 'Kendujhar', 'Konark', 'Koraput', 'Paradip', 'Phulabani', 'Puri', 'Sambalpur', 'Udayagiri'],
  Puducherry: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
  Punjab: ['Amritsar', 'Batala', 'Chandigarh', 'Faridkot', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Nabha', 'Patiala', 'Rupnagar', 'Sangrur'],
  Rajasthan: ['Abu', 'Ajmer', 'Alwar', 'Amer', 'Barmer', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittaurgarh', 'Churu', 'Dhaulpur', 'Dungarpur', 'Ganganagar', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalor', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Pushkar', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'],
  Sikkim: ['Gangtok', 'Gyalshing', 'Lachung', 'Mangan'],
  'Tamil Nadu': ['Arcot', 'Chengalpattu', 'Chennai', 'Chidambaram', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kanchipuram', 'Kanniyakumari', 'Kodaikanal', 'Kumbakonam', 'Madurai', 'Mamallapuram', 'Nagappattinam', 'Nagercoil', 'Palayamkottai', 'Pudukkottai', 'Salem', 'Thanjavur', 'Tiruchchirappalli', 'Tirunelveli', 'Tiruppur', 'Thoothukudi', 'Udhagamandalam', 'Vellore'],
  Telangana: ['Hyderabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nizamabad', 'Sangareddi', 'Warangal'],
  Tripura: ['Agartala'],
  'Uttar Pradesh': ['Agra', 'Aligarh', 'Amroha', 'Ayodhya', 'Azamgarh', 'Bahraich', 'Ballia', 'Banda', 'Bareilly', 'Basti', 'Bijnor', 'Budaun', 'Bulandshahr', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hardoi', 'Hathras', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur', 'Lakhimpur', 'Lalitpur', 'Lucknow', 'Mainpuri', 'Mathura', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Prayagraj', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Shahjahanpur', 'Sitapur', 'Sultanpur', 'Varanasi'],
  Uttarakhand: ['Almora', 'Dehra Dun', 'Haridwar', 'Mussoorie', 'Nainital', 'Pithoragarh'],
  'West Bengal': ['Alipore', 'Alipur Duar', 'Asansol', 'Baharampur', 'Balurghat', 'Bankura', 'Barasat', 'Barrackpore', 'Darjeeling', 'Durgapur', 'Halisahar', 'Howrah', 'Jalpaiguri', 'Kalimpong', 'Kharagpur', 'Kolkata', 'Krishnanagar', 'Malda', 'Midnapore', 'Murshidabad', 'Nabadwip', 'Panihati', 'Purulia', 'Raiganj', 'Siliguri', 'Tamluk'],
};
const states = Object.keys(citiesByState);

function SelectField({
  label,
  value,
  options,
  placeholder,
  disabled,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.selectWrap}>
      <Text style={styles.selectLabel}>{label}</Text>
      <Pressable
        disabled={disabled}
        onPress={() => setVisible(true)}
        style={[styles.select, disabled && styles.selectDisabled]}
      >
        <Text style={value ? styles.selectValue : styles.selectPlaceholder}>
          {value || placeholder}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setVisible(false)}>
          <View style={styles.optionSheet}>
            <Text style={styles.optionTitle}>Select {label}</Text>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [error, setError] = useState('');
  const validMobile = /^[6-9]\d{9}$/.test(mobile);
  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require('../assets/sabji-wala-logo.png')} style={styles.logo} />
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Fresh vegetables, delivered to your door.
        </Text>
        <Input
          label="Full name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          error={error && !name ? error : undefined}
          compact
        />
        <Input
          label="Mobile number"
          value={mobile}
          onChangeText={text => setMobile(text.replace(/\D/g, '').slice(0, 10))}
          keyboardType="number-pad"
          placeholder="10-digit mobile number"
          error={error && !validMobile ? error : undefined}
          compact
        />
        <SelectField
          label="State"
          value={state}
          options={states}
          placeholder="Select your state"
          onSelect={selectedState => {
            setState(selectedState);
            setCity('');
          }}
        />
        <SelectField
          label="City"
          value={city}
          options={state ? citiesByState[state] : []}
          placeholder={state ? 'Select your city' : 'Select state first'}
          disabled={!state}
          onSelect={setCity}
        />
        <Input
          label="Street"
          value={street}
          onChangeText={setStreet}
          placeholder="House number and street"
          autoCapitalize="words"
          error={error && !street.trim() ? error : undefined}
          compact
        />
        <Input
          label="Landmark"
          value={landmark}
          onChangeText={setLandmark}
          placeholder="Nearby landmark"
          autoCapitalize="words"
          error={error && !landmark.trim() ? error : undefined}
          compact
        />
        <Button
          title="Send OTP"
          onPress={() => {
            if (!name.trim()) setError('Please enter your full name');
            else if (!validMobile)
              setError('Enter a valid 10-digit mobile number');
            else if (!state.trim() || !city.trim() || !street.trim() || !landmark.trim())
              setError('Please complete your address');
            else {
              setError('');
              navigation.navigate('Otp', {
                mode: 'register',
                name: name.trim(),
                mobile,
                address: `${street.trim()}, ${landmark.trim()}, ${city.trim()}, ${state.trim()}`,
              });
            }
          }}
          secondary
        />
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            Already have an account?{' '}
            <Text style={{ fontWeight: '800' }}>Login</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 24 },
  logo: { width: 130, height: 130, alignSelf: 'center', resizeMode: 'contain' },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: 12 },
  subtitle: { color: colors.muted, marginVertical: 10, fontSize: 16 },
  link: {
    textAlign: 'center',
    color: colors.primary,
    padding: 20,
    fontSize: 15,
  },
  selectWrap: { marginBottom: 10 },
  selectLabel: { color: colors.text, fontWeight: '700', marginBottom: 5 },
  select: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectDisabled: { opacity: 0.6 },
  selectValue: { color: colors.text, fontSize: 16 },
  selectPlaceholder: { color: colors.muted, fontSize: 16 },
  chevron: { color: colors.muted, fontSize: 20, marginTop: -5 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'flex-end',
  },
  optionSheet: {
    maxHeight: '65%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
  },
  optionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 8 },
  option: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border },
  optionText: { color: colors.text, fontSize: 16 },
});
