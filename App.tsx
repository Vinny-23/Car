import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

/* Import local images */
const carImages = [
  require('3439662.jpg'),
  require('https://cdn.honda.co.za/main-03/general/fit/thumbnail/FITFacelift_Gallery_Thumbnails_Thumb_6.jpg'),
  require('https://www.honda.co.uk/content/dam/central/cars/jazz-hybrid/mmc-24ym/Honda-jazz-hybrid-popular-01-1024x576.png/_jcr_content/renditions/c3.png'),
  require('https://img.autotrader.co.za/14390029'),
  require('https://res.cloudinary.com/halfway-group/image/upload/f_auto,fl_lossy/w_636%2Cq_90%2Cc_scale/v1719224192/oem/full/toyota/corolla/60027811/colour-selectors/attitude_black_zpuzq8.png'),
  require('https://cdn.hyundai.co.za/i20_Executive_Thumbnail_png_1719910104New_webp_1720006912.webp'),
];

/* Data Models (TypeScript) */
class Car {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  isAvailable: boolean;
  image: any;

  constructor(id: number, make: string, model: string, year: number, pricePerDay: number, isAvailable: boolean, image: any) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.pricePerDay = pricePerDay;
    this.isAvailable = isAvailable;
    this.image = image;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

class Customer implements User {
  id: number;
  name: string;
  email: string;
  role: 'customer' = 'customer';

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class Admin implements User {
  id: number;
  name: string;
  email: string;
  role: 'admin' = 'admin';

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

/* Main App Component */
export default function App() {
  const [userRole, setUserRole] = useState<'admin' | 'customer' | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');

  /*Login Screen*/
  if (!userRole) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Car Booking Service</Text>
        <TouchableOpacity style={styles.button} onPress={() => setUserRole('admin')}>
          <Text style={styles.buttonText}>Login as Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setUserRole('customer')}>
          <Text style={styles.buttonText}>Login as Customer</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  /*Admin Screen: Add Car*/
  if (userRole === 'admin') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Admin Panel - Add Car</Text>
        <TextInput
          style={styles.input}
          placeholder="Make"
          value={make}
          onChangeText={setMake}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          value={model}
          onChangeText={setModel}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Price Per Day"
          value={pricePerDay}
          onChangeText={setPricePerDay}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (make && model && year && pricePerDay) {
              const image = carImages[cars.length % carImages.length];
              const newCar = {
                id: cars.length + 1,
                make,
                model,
                year: parseInt(year),
                pricePerDay: parseFloat(pricePerDay),
                isAvailable: true,
                image,
              };
              setCars([...cars, newCar]);
              setMake('');
              setModel('');
              setYear('');
              setPricePerDay('');
            } else {
              alert('Please fill all fields to add a car.');
            }
          }}
        >
          <Text style={styles.buttonText}>Add Car</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Available Cars:</Text>
        <FlatList
          data={cars}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.carItem}>
              <Image source={item.image} style={styles.carImage} />
              <Text>{item.make} {item.model} ({item.year}) - ${item.pricePerDay}/day</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => setUserRole(null)}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  /*Customer Screen: View Cars*/
  if (userRole === 'customer') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Available Cars</Text>
        <FlatList
          data={cars}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.carItem}>
              <Image source={item.image} style={styles.carImage} />
              <Text>{item.make} {item.model} ({item.year}) - ${item.pricePerDay}/day</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => setUserRole(null)}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(97, 10, 143, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000ff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'rgba(97, 10, 143, 1)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000ff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    width: 220,
    backgroundColor: 'rgba(97, 10, 143, 1)',
    color: '#000000ff',
  },
  button: {
    backgroundColor: '#000000ff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffffe7',
    fontWeight: 'bold',
  },
  carItem: {
    marginVertical: 8,
    backgroundColor: '#000000ff',
    padding: 10,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
  },
  carImage: {
    width: 180,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
});
