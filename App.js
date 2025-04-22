import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem('supermarketList');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };
    loadItems();
  }, []);

  const addItem = async () => {
    if (item.trim() && categoria.trim()) {
      const newitem = { nome: item.trim(), categoria: categoria.trim() };
      const newItems = [...items, newitem];
      setItems(newItems);
      setItem('');
      setCategoria('');
      await AsyncStorage.setItem('supermarketList', JSON.stringify(newItems));


    } else {
      Alert.alert("Lista vazia");
    }
  }

  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);

  const [categoria, setCategoria] = useState('');



  const removerItem = async (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    await AsyncStorage.setItem('supermarketList', JSON.stringify(newItems));
  }

  const removerAllitems = async () => {
    Alert.alert('ATENÇÃO', 'Deseja deletar todos os items da lista?', [
      {
        text: 'Cancel',
        onPress: () => Alert.alert("Processo encerrado"),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => removerItems() },
    ]);
  }

  const removerItems = async () => {
    const newItems = items.splice();
    setItems(newItems);
    await AsyncStorage.setItem('supermarketList', JSON.stringify(newItems));
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{item.nome}</Text>
      <Text>{item.categoria}</Text>
      <TouchableOpacity onPress={() => removerItem(index)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Supermercado</Text>
      <View style={styles.caixa1}>
        <TextInput
          style={styles.input} placeholder="Adicione um item"
          value={item}
          onChangeText={setItem}
        />
        <TextInput
          style={styles.input} placeholder="Categoria do produto"
          value={categoria}
          onChangeText={setCategoria}
        />
      </View>
      <Button title="Adicionar" onPress={addItem} />
      <View style={styles.caixa2}>
        <TouchableOpacity onPress={() => removerAllitems()} style={styles.removeAllbutton}>
          <Text style={styles.removeButtonText}>Remover Todos os items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filtro()} style={styles.filterButton}>
          <Text style={styles.removeButtonText}>Filtrar Items</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.numeroArray}>Numero de Items cadastrados: {items.length}</Text>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
  },
  removeAllbutton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#5656',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  numeroArray: {
    borderWidth: 1,
    padding: 3,
  },
  caixa1: {
    marginBottom: 10,
  },
  caixa2:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoria: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#2323',
  }
});
export default App;