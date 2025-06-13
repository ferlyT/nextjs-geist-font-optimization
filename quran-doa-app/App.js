import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, FlatList, Text, View, StyleSheet } from 'react-native';
import doaData from './assets/quran-doa.json';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [filteredDoa, setFilteredDoa] = useState(doaData);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredDoa(doaData);
    } else {
      const filtered = doaData.filter(item =>
        item.text.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoa(filtered);
    }
  }, [searchText]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.surahText}>{item.surah} - Ayah {item.ayah}</Text>
      <Text style={styles.doaText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cari Doa dalam Quran</Text>
      <TextInput
        style={styles.input}
        placeholder="Ketik kata kunci doa..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredDoa}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noResults}>Tidak ada hasil ditemukan.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  itemContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 10,
  },
  surahText: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 5,
  },
  doaText: {
    color: '#fff',
    fontSize: 16,
  },
  noResults: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
