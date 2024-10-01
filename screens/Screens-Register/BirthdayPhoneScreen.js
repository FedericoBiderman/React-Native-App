import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const BirthdayPhoneScreen = ({ route }) => {
    const [birthday, setBirthday] = useState(new Date(2009, 0, 1)); // Default date set to Jan 1, 2009
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [countries, setCountries] = useState([
        { label: 'Afghanistan (+93)', value: '+93', flag: '🇦🇫' },
        { label: 'Albania (+355)', value: '+355', flag: '🇦🇱' },
        { label: 'Algeria (+213)', value: '+213', flag: '🇩🇿' },
        { label: 'Andorra (+376)', value: '+376', flag: '🇦🇩' },
        { label: 'Angola (+244)', value: '+244', flag: '🇦🇴' },
        { label: 'Argentina (+54)', value: '+54', flag: '🇦🇷' },
        { label: 'Armenia (+374)', value: '+374', flag: '🇦🇲' },
        { label: 'Australia (+61)', value: '+61', flag: '🇦🇺' },
        { label: 'Austria (+43)', value: '+43', flag: '🇦🇹' },
        { label: 'Azerbaijan (+994)', value: '+994', flag: '🇦🇿' },
        { label: 'Bahamas (+1-242)', value: '+1-242', flag: '🇧🇸' },
        { label: 'Bahrain (+973)', value: '+973', flag: '🇧🇭' },
        { label: 'Bangladesh (+880)', value: '+880', flag: '🇧🇩' },
        { label: 'Barbados (+1-246)', value: '+1-246', flag: '🇧🇧' },
        { label: 'Belarus (+375)', value: '+375', flag: '🇧🇾' },
        { label: 'Belgium (+32)', value: '+32', flag: '🇧🇪' },
        { label: 'Belize (+501)', value: '+501', flag: '🇧🇿' },
        { label: 'Benin (+229)', value: '+229', flag: '🇧🇯' },
        { label: 'Bhutan (+975)', value: '+975', flag: '🇧🇹' },
        { label: 'Bolivia (+591)', value: '+591', flag: '🇧🇴' },
        { label: 'Bosnia and Herzegovina (+387)', value: '+387', flag: '🇧🇦' },
        { label: 'Botswana (+267)', value: '+267', flag: '🇧🇼' },
        { label: 'Brazil (+55)', value: '+55', flag: '🇧🇷' },
        { label: 'Brunei (+673)', value: '+673', flag: '🇧🇳' },
        { label: 'Bulgaria (+359)', value: '+359', flag: '🇧🇬' },
        { label: 'Burkina Faso (+226)', value: '+226', flag: '🇧🇫' },
        { label: 'Burundi (+257)', value: '+257', flag: '🇧🇮' },
        { label: 'Cabo Verde (+238)', value: '+238', flag: '🇨🇻' },
        { label: 'Cambodia (+855)', value: '+855', flag: '🇰🇭' },
        { label: 'Cameroon (+237)', value: '+237', flag: '🇨🇲' },
        { label: 'Canada (+1)', value: '+1', flag: '🇨🇦' },
        { label: 'Central African Republic (+236)', value: '+236', flag: '🇨🇫' },
        { label: 'Chad (+235)', value: '+235', flag: '🇹🇩' },
        { label: 'Chile (+56)', value: '+56', flag: '🇨🇱' },
        { label: 'China (+86)', value: '+86', flag: '🇨🇳' },
        { label: 'Colombia (+57)', value: '+57', flag: '🇨🇴' },
        { label: 'Comoros (+269)', value: '+269', flag: '🇰🇲' },
        { label: 'Congo (+242)', value: '+242', flag: '🇨🇬' },
        { label: 'Congo, Democratic Republic of the (+243)', value: '+243', flag: '🇨🇩' },
        { label: 'Costa Rica (+506)', value: '+506', flag: '🇨🇷' },
        { label: 'Croatia (+385)', value: '+385', flag: '🇭🇷' },
        { label: 'Cuba (+53)', value: '+53', flag: '🇨🇺' },
        { label: 'Cyprus (+357)', value: '+357', flag: '🇨🇾' },
        { label: 'Czech Republic (+420)', value: '+420', flag: '🇨🇿' },
        { label: 'Denmark (+45)', value: '+45', flag: '🇩🇰' },
        { label: 'Djibouti (+253)', value: '+253', flag: '🇩🇯' },
        { label: 'Dominica (+1-767)', value: '+1-767', flag: '🇩🇲' },
        { label: 'Dominican Republic (+1-809, +1-829, +1-849)', value: '+1-809', flag: '🇩🇴' },
        { label: 'Ecuador (+593)', value: '+593', flag: '🇪🇨' },
        { label: 'Egypt (+20)', value: '+20', flag: '🇪🇬' },
        { label: 'El Salvador (+503)', value: '+503', flag: '🇸🇻' },
        { label: 'Equatorial Guinea (+240)', value: '+240', flag: '🇬🇶' },
        { label: 'Eritrea (+291)', value: '+291', flag: '🇪🇷' },
        { label: 'Estonia (+372)', value: '+372', flag: '🇪🇪' },
        { label: 'Eswatini (+268)', value: '+268', flag: '🇸🇿' },
        { label: 'Ethiopia (+251)', value: '+251', flag: '🇪🇹' },
        { label: 'Fiji (+679)', value: '+679', flag: '🇫🇯' },
        { label: 'Finland (+358)', value: '+358', flag: '🇫🇮' },
        { label: 'France (+33)', value: '+33', flag: '🇫🇷' },
        { label: 'Gabon (+241)', value: '+241', flag: '🇬🇦' },
        { label: 'Gambia (+220)', value: '+220', flag: '🇬🇬' },
        { label: 'Georgia (+995)', value: '+995', flag: '🇬🇪' },
        { label: 'Germany (+49)', value: '+49', flag: '🇩🇪' },
        { label: 'Ghana (+233)', value: '+233', flag: '🇬🇭' },
        { label: 'Greece (+30)', value: '+30', flag: '🇬🇷' },
        { label: 'Grenada (+1-473)', value: '+1-473', flag: '🇬🇩' },
        { label: 'Guatemala (+502)', value: '+502', flag: '🇬🇹' },
        { label: 'Guinea (+224)', value: '+224', flag: '🇬🇳' },
        { label: 'Guinea-Bissau (+245)', value: '+245', flag: '🇬🇼' },
        { label: 'Guyana (+592)', value: '+592', flag: '🇬🇾' },
        { label: 'Haiti (+509)', value: '+509', flag: '🇭🇹' },
        { label: 'Honduras (+504)', value: '+504', flag: '🇭🇳' },
        { label: 'Hungary (+36)', value: '+36', flag: '🇭🇺' },
        { label: 'Iceland (+354)', value: '+354', flag: '🇮🇸' },
        { label: 'India (+91)', value: '+91', flag: '🇮🇳' },
        { label: 'Indonesia (+62)', value: '+62', flag: '🇮🇩' },
        { label: 'Iran (+98)', value: '+98', flag: '🇮🇷' },
        { label: 'Iraq (+964)', value: '+964', flag: '🇮🇶' },
        { label: 'Ireland (+353)', value: '+353', flag: '🇮🇪' },
        { label: 'Israel (+972)', value: '+972', flag: '🇮🇱' },
        { label: 'Italy (+39)', value: '+39', flag: '🇮🇹' },
        { label: 'Jamaica (+1-876)', value: '+1-876', flag: '🇯🇲' },
        { label: 'Japan (+81)', value: '+81', flag: '🇯🇵' },
        { label: 'Jordan (+962)', value: '+962', flag: '🇯🇴' },
        { label: 'Kazakhstan (+7)', value: '+7', flag: '🇰🇿' },
        { label: 'Kenya (+254)', value: '+254', flag: '🇰🇪' },
        { label: 'Kiribati (+686)', value: '+686', flag: '🇰🇮' },
        { label: 'Korea, North (+850)', value: '+850', flag: '🇰🇵' },
        { label: 'Korea, South (+82)', value: '+82', flag: '🇰🇷' },
        { label: 'Kuwait (+965)', value: '+965', flag: '🇰🇼' },
        { label: 'Kyrgyzstan (+996)', value: '+996', flag: '🇰🇬' },
        { label: 'Laos (+856)', value: '+856', flag: '🇱🇦' },
        { label: 'Latvia (+371)', value: '+371', flag: '🇱🇻' },
        { label: 'Lebanon (+961)', value: '+961', flag: '🇱🇧' },
        { label: 'Lesotho (+266)', value: '+266', flag: '🇱🇸' },
        { label: 'Liberia (+231)', value: '+231', flag: '🇱🇷' },
        { label: 'Libya (+218)', value: '+218', flag: '🇱🇾' },
        { label: 'Liechtenstein (+423)', value: '+423', flag: '🇱🇮' },
        { label: 'Lithuania (+370)', value: '+370', flag: '🇱🇹' },
        { label: 'Luxembourg (+352)', value: '+352', flag: '🇱🇺' },
        { label: 'Madagascar (+261)', value: '+261', flag: '🇲🇬' },
        { label: 'Malawi (+265)', value: '+265', flag: '🇲🇼' },
        { label: 'Malaysia (+60)', value: '+60', flag: '🇲🇾' },
        { label: 'Maldives (+960)', value: '+960', flag: '🇲🇻' },
        { label: 'Mali (+223)', value: '+223', flag: '🇲🇱' },
        { label: 'Malta (+356)', value: '+356', flag: '🇲🇹' },
        { label: 'Marshall Islands (+692)', value: '+692', flag: '🇲🇭' },
        { label: 'Mauritania (+222)', value: '+222', flag: '🇲🇦' },
        { label: 'Mauritius (+230)', value: '+230', flag: '🇲🇺' },
        { label: 'Mexico (+52)', value: '+52', flag: '🇲🇽' },
        { label: 'Micronesia (+691)', value: '+691', flag: '🇫🇲' },
        { label: 'Moldova (+373)', value: '+373', flag: '🇲🇩' },
        { label: 'Monaco (+377)', value: '+377', flag: '🇲🇨' },
        { label: 'Mongolia (+976)', value: '+976', flag: '🇲🇳' },
        { label: 'Montenegro (+382)', value: '+382', flag: '🇲🇪' },
        { label: 'Morocco (+212)', value: '+212', flag: '🇲🇦' },
        { label: 'Mozambique (+258)', value: '+258', flag: '🇲🇿' },
        { label: 'Myanmar (+95)', value: '+95', flag: '🇲🇲' },
        { label: 'Namibia (+264)', value: '+264', flag: '🇳🇦' },
        { label: 'Nauru (+674)', value: '+674', flag: '🇳🇷' },
        { label: 'Nepal (+977)', value: '+977', flag: '🇳🇵' },
        { label: 'Netherlands (+31)', value: '+31', flag: '🇳🇱' },
        { label: 'New Zealand (+64)', value: '+64', flag: '🇳🇿' },
        { label: 'Nicaragua (+505)', value: '+505', flag: '🇳🇮' },
        { label: 'Niger (+227)', value: '+227', flag: '🇳🇪' },
        { label: 'Nigeria (+234)', value: '+234', flag: '🇳🇬' },
        { label: 'North Macedonia (+389)', value: '+389', flag: '🇲🇰' },
        { label: 'Norway (+47)', value: '+47', flag: '🇳🇴' },
        { label: 'Oman (+968)', value: '+968', flag: '🇴🇲' },
        { label: 'Pakistan (+92)', value: '+92', flag: '🇵🇰' },
        { label: 'Palau (+680)', value: '+680', flag: '🇵🇼' },
        { label: 'Palestine (+970)', value: '+970', flag: '🇵🇸' },
        { label: 'Panama (+507)', value: '+507', flag: '🇵🇦' },
        { label: 'Papua New Guinea (+675)', value: '+675', flag: '🇵🇬' },
        { label: 'Paraguay (+595)', value: '+595', flag: '🇵🇾' },
        { label: 'Peru (+51)', value: '+51', flag: '🇵🇪' },
        { label: 'Philippines (+63)', value: '+63', flag: '🇵🇭' },
        { label: 'Poland (+48)', value: '+48', flag: '🇵🇱' },
        { label: 'Portugal (+351)', value: '+351', flag: '🇵🇹' },
        { label: 'Qatar (+974)', value: '+974', flag: '🇶🇦' },
        { label: 'Romania (+40)', value: '+40', flag: '🇷🇴' },
        { label: 'Russia (+7)', value: '+7', flag: '🇷🇺' },
        { label: 'Rwanda (+250)', value: '+250', flag: '🇷🇼' },
        { label: 'Saint Kitts and Nevis (+1-869)', value: '+1-869', flag: '🇰🇳' },
        { label: 'Saint Lucia (+1-758)', value: '+1-758', flag: '🇱🇨' },
        { label: 'Saint Vincent and the Grenadines (+1-784)', value: '+1-784', flag: '🇻🇨' },
        { label: 'Samoa (+685)', value: '+685', flag: '🇼🇸' },
        { label: 'San Marino (+378)', value: '+378', flag: '🇸🇲' },
        { label: 'Sao Tome and Principe (+239)', value: '+239', flag: '🇸🇹' },
        { label: 'Saudi Arabia (+966)', value: '+966', flag: '🇸🇦' },
        { label: 'Senegal (+221)', value: '+221', flag: '🇸🇳' },
        { label: 'Serbia (+381)', value: '+381', flag: '🇷🇸' },
        { label: 'Seychelles (+248)', value: '+248', flag: '🇸🇨' },
        { label: 'Sierra Leone (+232)', value: '+232', flag: '🇸🇱' },
        { label: 'Singapore (+65)', value: '+65', flag: '🇸🇬' },
        { label: 'Slovakia (+421)', value: '+421', flag: '🇸🇰' },
        { label: 'Slovenia (+386)', value: '+386', flag: '🇸🇮' },
        { label: 'Solomon Islands (+677)', value: '+677', flag: '🇸🇧' },
        { label: 'Somalia (+252)', value: '+252', flag: '🇸🇴' },
        { label: 'South Africa (+27)', value: '+27', flag: '🇿🇦' },
        { label: 'South Sudan (+211)', value: '+211', flag: '🇸🇸' },
        { label: 'Spain (+34)', value: '+34', flag: '🇪🇸' },
        { label: 'Sri Lanka (+94)', value: '+94', flag: '🇱🇰' },
        { label: 'Sudan (+249)', value: '+249', flag: '🇸🇩' },
        { label: 'Suriname (+597)', value: '+597', flag: '🇸🇷' },
        { label: 'Sweden (+46)', value: '+46', flag: '🇸🇪' },
        { label: 'Switzerland (+41)', value: '+41', flag: '🇨🇭' },
        { label: 'Syria (+963)', value: '+963', flag: '🇸🇾' },
        { label: 'Taiwan (+886)', value: '+886', flag: '🇹🇼' },
        { label: 'Tajikistan (+992)', value: '+992', flag: '🇹🇯' },
        { label: 'Tanzania (+255)', value: '+255', flag: '🇹🇿' },
        { label: 'Thailand (+66)', value: '+66', flag: '🇹🇭' },
        { label: 'Timor-Leste (+670)', value: '+670', flag: '🇹🇱' },
        { label: 'Togo (+228)', value: '+228', flag: '🇹🇬' },
        { label: 'Tonga (+676)', value: '+676', flag: '🇹🇴' },
        { label: 'Trinidad and Tobago (+1-868)', value: '+1-868', flag: '🇹🇹' },
        { label: 'Tunisia (+216)', value: '+216', flag: '🇹🇳' },
        { label: 'Turkey (+90)', value: '+90', flag: '🇹🇷' },
        { label: 'Turkmenistan (+993)', value: '+993', flag: '🇹🇲' },
        { label: 'Tuvalu (+688)', value: '+688', flag: '🇹🇻' },
        { label: 'Uganda (+256)', value: '+256', flag: '🇺🇬' },
        { label: 'Ukraine (+380)', value: '+380', flag: '🇺🇦' },
        { label: 'United Arab Emirates (+971)', value: '+971', flag: '🇦🇪' },
        { label: 'United Kingdom (+44)', value: '+44', flag: '🇬🇧' },
        { label: 'United States (+1)', value: '+1', flag: '🇺🇸' },
        { label: 'Uruguay (+598)', value: '+598', flag: '🇺🇾' },
        { label: 'Uzbekistan (+998)', value: '+998', flag: '🇺🇿' },
        { label: 'Vanuatu (+678)', value: '+678', flag: '🇻🇺' },
        { label: 'Vatican City (+39)', value: '+39', flag: '🇻🇦' },
        { label: 'Venezuela (+58)', value: '+58', flag: '🇻🇪' },
        { label: 'Vietnam (+84)', value: '+84', flag: '🇻🇳' },
        { label: 'Yemen (+967)', value: '+967', flag: '🇾🇪' },
        { label: 'Zambia (+260)', value: '+260', flag: '🇿🇲' },
        { label: 'Zimbabwe (+263)', value: '+263', flag: '🇿🇦' },
    ]);
    const navigation = useNavigation();

    const handleContinue = () => {
        const data = {
            birthday: birthday.toISOString().split('T')[0],
            phoneNumber: phoneNumber,
            countryCode: countryCode,
        };
        console.log(data); // Puedes enviar los datos al servidor o manejarlos como necesites

        // Navegar a la siguiente pantalla
        navigation.navigate('GenderScreen', { ...route.params, ...data });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Ingrese su Fecha de Nacimiento y Número de Teléfono</Text>

                <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '20%' }]} />
        </View>

                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                    <Text style={styles.datePickerText}>
                        {birthday.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={birthday}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || birthday;
                            setShowDatePicker(false);
                            setBirthday(currentDate);
                        }}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Número de Teléfono"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <Picker
                    selectedValue={countryCode}
                    style={styles.picker}
                    onValueChange={(itemValue) => setCountryCode(itemValue)}>
                    {countries.map((country) => (
                        <Picker.Item key={country.value} label={`${country.flag} ${country.label}`} value={country.value} />
                    ))}
                </Picker>

                <TouchableOpacity onPress={handleContinue} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    datePickerButton: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    datePickerText: {
        color: '#555',
        fontSize: 18,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 20,
      },
      progressFill: {
        height: '100%',
        borderRadius: 4,
        backgroundColor: '#4CAF50',
      },
    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    picker: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BirthdayPhoneScreen;