import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import {
    TouchableOpacity,
    FlatList,
    View,
    Text,
    StatusBar,
    Platform,
    StyleSheet,
    TextInput,
  } from 'react-native';
  
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

interface Service {
    id: string;
    name: string;
    duration: string;
    price: number;
    description: string;
}



const servicesData = [
  { id: '1', name: 'ADD-ON 🚗🚗 GETITDONE Freelance', duration: '2 hours', price: 50, description: 'Getitdone travels to you. Must have at LEAST 1 previous service performed in the shop $30& up added to per clientv& service. Must be booked 24hrs in advance. Excludes washes, coloring, and other chemical services services.' },
  { id: '2', name: 'GETITTRIMMED', duration: '1 hour', price: 75, description: '$75 & up. Trimming less than 2 inches. Either a blunt, layer, or faceframe cut. Consultation and images of desired look recommended. Wash included.' },
  { id: '3', name: 'GETITCHOPPED', duration: '1 hour 30 minutes', price: 100, description: '$100 & up. Cutting more than 2 inches. Cut of what is damaged from chemical or heat damage. Includes a blunt, layered, & faceframe cut. Consultation and image of desired look recommended. Wash included.' },
  { id: '4', name: 'Wash & Silkwrap', duration: '2 hours', price: 100, description: '$100 & up. Wash, & Thermal Straghtening technique(Silkwrap). The Wash is complimentary, so come detangled and ready to GETITDONE!!' },
  { id: '5', name: 'FULL SILKING Experience', duration: '3 hours', price: 225, description: '$225 & up Style removal/Detangling, Wash, Gloss treatment, Haircut, & Silkwrap!!' },
  { id: '6', name: 'Wash, Curl, & GO!', duration: '2 hours', price: 80, description: '$80 & up. Wash, & Curly styling (must come predetangled & preferably product-free)' },
  { id: '7', name: 'Crochet Extensions', duration: '3 hours', price: 120, description: '$120 & up. Hair and wash not provided. Plus receipt if I supply the hair.' },
  { id: '8', name: 'Quick Weave', duration: '3 hours', price: 100, description: '$100 & up, Time includes Braiding, Styling, and proper glue down maintenance tips. Wash & Hair NOT INCLUDED. Closures add $25. Frontals add $35. 2-3 bundles recommended. Wand curl finishing styles are additional. ' },
  { id: '9', name: 'Partial Sew In With Leaveout', duration: '3 hours', price: 120, description: '$120 & up, Leave out-hair of the client in which is used to conceal or camouflage extentions. Time includes styling and proper sew in maintainence tips. Wash and Hair not included so come washed & detangled. 2-3 recommended. Wand curl finishing styles are additional.' },
  { id: '10', name: 'Full Sew In With Closure', duration: '4 hours', price: 150, description: '$150 & up, Time includes styling and proper sew in maintainenance tips. Wash, Hair, and closure not included. 2-3 bundles recommended. Wand curl finishingstyles are additional.' },
  { id: '11', name: 'Full Sew In With Frontal', duration: '4 hours', price: 200, description: '$200 & up, Tyra Experience certified! Wash, Hair and Frontal not included. 2-3 bundles recommended. Wand curl finishing styles & colorings are additional. HD & Transparent lace PLEASE' },
  { id: '12', name: 'GETITDONE Install/Closure Maintenance', duration: '2 hours 30 minutes', price: 50, description: '$50 & up. Realign, restitch, and/or realastic GETITDONE install. Wash, detangle, and restyle to its wet/natural wave pattern Installation date TO 3wks=$50 3wks TO 8wks = $UP **Will DECLINE maintaince for installs beyond its 2 month mark** Hair and closure not included.' },
  { id: '13', name: 'Braided Ponytail/Bun', duration: '4 hours', price: 100, description: '$100 & up, Feed in braided ponytail. Wash and hair not included. If I provide the hair its plus receipt. If you are providing your own hair, it MUST BE prestreched(feathered ended), boil & burn sealable hair.' },
    { id: '14', name: 'Retwist', duration: '2 hours', price: 75, description: '$75 & up, Retwist and style human haired dreads. Not synthetic/crochet dreads. Wash not included.' },
    { id: '15', name: 'Wash & Retwist', duration: '3 hours', price: 100, description: '$100 & up, Wash, retwist, and style human haired dreads. Not synthetic or crochet dreads.' },
    { id: '16', name: 'Start Locs/ Coil Curl Set', duration: '3 hours', price: 75, description: '$$75 & up, Start your dreads no extensions. Wash not included. Can be added. Come washed and detangled. Specific Shaped parting preferences may have an additional charge.' },
    { id: '17', name: 'Instant Locs With Natural Hair', duration: '4 hours', price: 400, description: '$400 & up, Instant dread locs with your natural hair. Dreads without the 6 months- 1 year process. Wash not included.' },
    { id: '18', name: "Men's Faux Locs", duration: '3 hours', price: 150, description: '150 & up Wash and Hair not included. Plus receipt if I supply the hair. Parting, density(how full), & length can change your price. Come washed and ready to GETITDONE!' },
    { id: '19', name: "Men's Faux Locs Maintenance", duration: '1 hour', price: 50, description: '$50 & up, Retwist, reburn, and/or reboil.' },
    { id: '20', name: "Women's Faux Locs", duration: '5 hours', price: 200, description: '$200 & up, Wash and Hair not included. Plus receipt if I supply the hair. Parting, density, & length can change your price. Come washed and ready to GETITDONE!' },
    { id: '21', name: "Women's Faux Locs Maintenance", duration: '2 hours 30 minutes', price: 75, description: '$75 & up, Retwist, reburn, and/or reboil.' },
    { id: '22', name: "Women's Butterfly/ Distressed Locs", duration: '5 hours', price: 200, description: '$200 & up, Wash and Hair not included. Plus receipt if I supply the hair. Parting, density, & length can change your price. Come washed and ready to GETITDONE!' },
    { id:'23', name: "GETITDONE's Unit Install", duration: '3 hours', price: 100, description: '$100 & up, Includes any GETITDONE U/V-Part wig.'},
    { id: '24', name:'Other Vendor Wig Install', duration: '3 hours', price: 150, description:'$150 & up, Wig must be new or approved by me (by email @getitdone431@gmail.com Instagram DM @getitdone_) Includes customizing, bleaching knots, plucking, and braiding down. Must be dropped of 3 days prior to appointment. You can bring your preferred wig cap and powdered foundation that matches your complexion.'},
    { id: '25', name:"GETITDONE's Install Removal", duration: '2 hours', price: 50, description: '$50 & up, Braid/foundation removal (2 months) Detangling Wash.'},
    { id: '26', name: "Other Stylist's Install Removal", duration: '2 hours 30 minutes', price: 100, description: '$100 & up, Removal of another stylists install. Braid/foundation removal(past 2 months) Detangle/Unmat then Wash.'},
    { id: '27', name: "Semi Permanent", duration: '1 hour 30 minutes', price: 50, description: '$50 & up, Aka color rinse or Glaze Includes dying extensions. My color services are SEPARATE from Styling services. Does not include styling.'},
    { id: '28', name: "Single Process Color", duration: '2 hours 30 minutes', price: 75, description: '$75 & up, One application of a permanent color. No highlights, rooting, or prelightening. My color services are SEPARATE from Styling services. ONLY for REGULAR CLIENTELE & HAIR EXTENSIONS.'},
    { id: '29', name: "Double Process Color", duration: '3 hours 30 minutes', price: 100, description:'$100 & up, One application of permanent color and one application of toner, semi permanent color, or prelightener. Dark Rooting, highlights, lowlights, balayage, toners, or prelightenings. My color services are SEPARATE from Styling services. ONLY for REGULAR CLIENTELE & HAIR EXTENSIONS.'},
    { id: '30', name: "Process Color To Blonde", duration: '5 hours', price: 150, description: '$150 & up, One application of permanent color and one application of a toner, semi/demi permanent color, or prelighteners  to get you to a shade of blonde. Includes wash. My color services are SEPARATE from Styling services. ONLY for REGULAR CLIENTELE & HAIR EXTENSIONS.'},
    { id: '31', name: "Men's 2 Cornrows", duration: '1 hour', price: 40, description: '$40 & up, No extensions. With extensions +$10. Wash not included. Wash $10 additional.'},
    { id: '32', name: "Men's Box Braids", duration: '2 hours', price: 60, description: '$60 & up, Box braids / 2Strand Twists with no extensions. On hair with tapered sides and no nape. Additional for a wash or to braid the nape(full head)'},
    { id: '33', name: "Men's Braided Freestyle", duration: '2 hours', price: 60, description: '$60 & up, Mens braided style. Nape, and sides are not include(additional $)No extensions'},
    { id: '34', name: "Men's Braided Freestyle with Extensions", duration: '2 hours', price: 75, description: '$75 & up, Nape, and sides are not included(additional $) Braided style with extensions added. Hair not included. Plus receipt if I supply the hair. If you are providing your own hair, it MUST BE prestretched(feathered ended), boil, & burn sealable hair. '},
    { id: '35', name: "Women's 2 Cornrows", duration: '1 hour', price: 55, description: '$55 & up, 2 cornrow on natural hair. No extensions added. With extensions +$10. Wash not included.'},
    { id: '36', name: "Women's Braided Freestyle", duration: '2 hours', price: 75, description: '$75 & up, Full braided style. No extensions. Wash not included. Come washed and ready to be braided.'},
    { id: '37', name: "Women's Braided Freestyle With Extensions", duration: '2 hours 30 minutes', price: 100, description: '$100 & up, Full braided style, Hair and Wash not included. Plus receipt if I supply the hair. If you are providing your own hair, it MUST BE prestretched(feathered ended), boil, & burn sealable hair. Come washed and ready to be braided.'},
    { id: '38', name: "Ponytail", duration: '1 hour 30 minutes', price: 80, description: '$80 & up, Get a Ponytail! Washed & Hair not included. If I supply the hair its plus receipt.'}
];

export default function ServicesScreen({ navigation }: any) {
    const renderItem = ({ item } : { item: Service }) => {
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'applePay' | 'cashApp' | 'card' | null>(null); 
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
   const router = useRouter();
   const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
   const [expandedServiceIds, setExpandedServiceIds] = useState<string[]>([]);


   
const selectedService = servicesData.find(service => service.id === selectedServiceId);
const selectedServiceName = selectedService ? selectedService.name : '';
const selectedServices = servicesData.filter(service => selectedServiceIds.includes(service.id)
);
const subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
const processingFee = 0.95;
const total = (subtotal + processingFee).toFixed(2);





    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>SELECT SERVICES</Text>
        <FlatList 
        data={servicesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        />
        {selectedServiceId ? (
  <View>
    <Text style={styles.confirmText}>You selected: {selectedServiceName}</Text>
    <TouchableOpacity onPress={() => setSelectedServiceId(null)} style={styles.changeButton}>
      <Text style={{ color: '#fff' }}>Change Service</Text>
    </TouchableOpacity>
  </View>
) : (
);
    };  

    

    return (
      <TouchableOpacity 
      style={[ styles.serviceCardSelected,
        selectedServiceIds.includes(Item.id)} ? styles.selectedCard : {}}
        onPress={() => {
            if (selectedServiceIds.includes(item.id)) {
                setSelectedServiceIds(selectedServiceIds.filter(id => id !== item.id));
               
            }
        }}
    
        <View style={styles.row}>
            <View style={styles.serviceCard}>
          <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDuration}>{item.duration}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.radioCircle}>
         <View style={styles.radioOuterCircle}></View>
         <View style={styles.radioInnerCircle} />
         </View>
          </View>
        {isExpanded && (
          <Text style={styles.serviceDescription}>{item.description}</Text>
        )}
        </View>
      </TouchableOpacity>
    );
   




{selectedServiceIds.length > 0 && (
    <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('PaymentScreen', { selectedServices })}
        >
            <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
    </View>



    




 




            {/* Payment Options */}
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>💳 Payment Method</Text>
              {['applePay', 'cashApp', 'card'].map((method) => (
                <TouchableOpacity
                  key={method}
                  onPress={() => setPaymentMethod(method)}
                  style={styles.paymentOption}
                >
                  <Text style={{ color: paymentMethod === method ? 'yellow' : 'white'}}>
                    {paymentMethod === method ? '✅' : '▫️'}{' '}
                    {method === 'applePay' && 'Apple Pay'}
                    {method === 'cashApp' &&  'Cash App Pay'}
                    {method === 'card' && 'Credit Card'}
                  </Text>
                </TouchableOpacity>
              ))}
              {paymentMethod === 'card' && (
                <View style={styles.cardInputContainer}>
                <TextInput
                placeholder="Enter Card Number"
                placeholderTextColor='#000'
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={16}
                secureTextEntry
                style={styles.input}
                  />
                <TextInput 
                placeholder="MM/YY"
                keyboardType="numeric"
                value={expiry}
                onChangeText={setExpiry}
                maxLength={4}
                placeholderTextColor="#000"
                style={styles.input}
                />
                <TextInput
                placeholder="CVV"
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
                placeholderTextColor="#000"
                maxLength={3}
                secureTextEntry
                style={styles.input}
                />
                </View>
              
              )}
        
        
</View>              

 

    






            {/* Book Button */}
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => {
                if (!selectedDate || !paymentMethod) {
                  alert('Please select a date/time and payment method.');
                  return;
                }
  
                alert(`Booking confirmed!\nService: ${selectedService?.name}\nDate: ${selectedDate.toLocaleString()}\nPayment: ${paymentMethod}`);
                // Optionally route to confirmation screen:
                // router.push('/(tabs)/confirmation');
              }}
            >
              <Text style={styles.bookText}>BOOK</Text>
            </TouchableOpacity>
    </SafeAreaView>
            )}
  
  const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, backgroundColor: '#000' },
    header: { 
        color: '#fff', 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
    serviceRow: {
      backgroundColor: '#111',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    name: { color: '#fff', fontWeight: 'bold' },
    duration: { color: '#ccc' },
    price: { color: '#f5c443', fontWeight: 'bold', marginTop: 5 },
    sectionTitle: { fontWeight: 'bold', color: '#fff', marginBottom: 5 },
    dateSelector: {
      backgroundColor: '#111',
      padding: 15,
      borderRadius: 10,
    },
    paymentOption: {
      backgroundColor: '#111',
      padding: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    bookButton: {
      backgroundColor: '#f5c443',
      padding: 15,
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 30,
    },
    bookText: {
      fontWeight: 'bold',
      color: '#000',
      fontSize: 16,
    },
    changeButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#333',
        borderRadius: 8,
        alignItems: 'center',
      },
      confirmText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
      },
      cardInputContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        gap: 10,
      },
      input: {
        backgroundColor: '#f2f2f2',
        padding: 3,
        borderRadius: 8,
        fontSize: 16,
        color: '#000',
        
      },
      serviceDescription: {
        fontSize: 13,
        color: '#ccc',
        marginTop: 4,
      },
      serviceCard: {
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
      },
      selectedCard: {
        borderColor: '#FFD700',
        borderWidth: 2,
      },
      serviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
      },
      servicePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
      },
      serviceDuration: {
        fontSize: 14,
        color: '#ccc',
      },
      radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
      },
      radioInnerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#FFD700',
      },
      footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 200,
        backgroundColor: '#000',
        borderTopWidth: 1,
        borderColor: '#333',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      totalLabel: {
        color: '#fff',
        fontSize: 16,
        marginRight: 8,
      },
      totalPrice: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
      },
      nextButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      nextButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
      },
      totalText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      checkmark: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#FFD700',
        marginLeft: 10,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      radioOuterCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
      }
  });
      
  