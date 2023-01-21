/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect } from 'react';
import { Node } from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectList } from 'react-native-dropdown-select-list'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  style,
  useColorScheme,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import { SceneMap } from 'react-native-tab-view';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */



const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {



  return (
    <NavigationContainer>
        <stack.Navigator initialRoute="Home">
          <stack.Screen name='Home' component={HomeScreen} />
          <stack.Screen name='Genre' component={GenreScreen} />
          <stack.Screen name='History' component={HistoryScreen} />
          <stack.Screen name='Addition' component={AdditionScreen} />

        </stack.Navigator>
    </NavigationContainer>
  )

};

const HomeScreen = ({ navigation, route }) => {

  

  const isDarkMode = useColorScheme() == 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [title, showTitle] = useState('');
  const [author, showAuthor] = useState('');
  const [genre, showGenre] = useState('');
  const [numberOfPages, showNumberOfPages] = useState('');
  const [totalNumberOfPages, showTotalNumberOfPages] = useState('');
  const [averageNumberOfPages, showAverageNumberOfPages] = useState('');

  return (
    <View>
      <View>
        <View>

          <Image style={{ height: 100, width: 250 }} source={require('./img/book.png')} />
        </View>
        <Text>Welcome to My Book Store</Text>

      </View>
      <Text>The last book read</Text>
      <View>
        <Text style={styles.lux}>Title:</Text>

        <Text style={styles.lux}>Author:</Text>

        <Text style={styles.lux}>Genre:</Text>

        <Text style={styles.lux}>Number of pages:</Text>

        <Text style={styles.lux}>Total number of pages:</Text>

        <Text style={styles.lux}>Average number of pages:</Text>

      </View>
      <View>
        <Button title="Genre"
          onPress={() => {
            navigation.navigate('Genre')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="History"
          onPress={() => {
            navigation.navigate('History')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="Addition"
          onPress={() => {
            navigation.navigate('Addition')
          }} />

      </View>


    </View>
  )
}

const GenreScreen = ({ navigation, route }) => {


  return (
    <View>


      <View>
        <Button title="Home"
          onPress={() => {
            navigation.navigate('Home')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="History"
          onPress={() => {
            navigation.navigate('History')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="Addition"
          onPress={() => {
            navigation.navigate('Addition')
          }} />

      </View>
    </View>
  )
}
function handlesubmit(values, actions) {



}

const HistoryScreen = ({ navigation, route }) => {

 const [latestBooks,setLatestBooks] = useState([])
 const [index, setIndex] = useState(0);
const getData = async () => {
    try {
      const bookList = await AsyncStorage.getItem('bookList')
      setLatestBooks(JSON.parse(bookList))
      return bookList != null ? JSON.parse(bookList) : [];
    } catch (e) {
      // error reading value
    }
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <View>
      <Text>History</Text>

   
      {
        latestBooks.map((book,index) => (
          <View key={index}>
    
          <Text>Enter Book Title:</Text>
          <Text>{book.title}</Text>
    
          <Text>Enter Author:</Text>
          <Text>{book.author}</Text>

          <Text>Genre:</Text>
          <Text>{book.genre}</Text>

          <Text>Average number of pages read:</Text>
          <Text>{book.averageNumberOfPages}</Text>

          <Text>Total average number of pages read:</Text>
          <Text>{book.totalNumberOfPages}</Text>
  
        </View>
        ))
      }

      <View>
        <Button title="Home"
          onPress={() => {
            navigation.navigate('Home')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="Genre"
          onPress={() => {
            navigation.navigate('Genre')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="Addition"
          onPress={() => {
            navigation.navigate('Addition')
          }} />

      </View>

    </View>
  )
}

const AdditionScreen = ({ navigation, route }) => {
  const [selected, setSelected] = React.useState("");
  const [bookData, setBookData] = React.useState({
    tittle: '',
    author: '',
    genre: '',
    numberOfPages: '',
    totalNumberOfPages: '',
    averageNumberOfPages: ''


  });

  

  const data = [
    { key: '1', value: 'Mystery' },
    { key: '2', value: 'Drama' },
    { key: '3', value: 'Action' },
    { key: '4', value: 'Comedy' },
    { key: '5', value: 'Horror' },
    { key: '6', value: 'Thriller' },
    { key: '7', value: 'Fantasy' },

  ];

  const getData = async () => {
    try {
      const bookList = await AsyncStorage.getItem('bookList')
      return bookList != null ? JSON.parse(bookList) : [];
    } catch (e) {
      // error reading value
    }
  }
  const storeData = async (bookData) => {
    try {
      const jsonValue = JSON.stringify(bookData)
      await AsyncStorage.setItem('bookList', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const handleSubmit =   (value) => {
    try {
      
      const bookList = getData()
      // bookList = JSON.parse(bookList)
      
      alert(bookList)
      if(bookList == null || bookList==undefined){
        bookList = []
        bookList.push(
          bookData
        )
      }

      if(bookList != null){
          bookList.push(
            bookData
          )
      }
      const jsonValue = JSON.stringify(bookList)
      storeData(jsonValue)
      
      navigation.navigate('History')

    } catch (e) {
      // saving error
      alert(e)
    }
  }
  


  const handleChange = ({ name, value }) => {

    setBookData(prev => ({
      ...prev,
      [name]: value
    }))

   
  }


  return (
    <View>
      <Text>Book Addition</Text>

      <Text>

      </Text>

      <Text>Enter Book Title:</Text>
      <TextInput
        onChangeText={(value) => handleChange({ name: 'title', value })}
        placeholder="Book Title"
      />




      <Text>Enter Author:</Text>
      <TextInput
        onChangeText={(value) => handleChange({ name: 'author', value })}
        placeholder="Author"
      />
      <Text>Genre:</Text>
      <SelectList
        style={styles.thandeka}
        setSelected={(val) => {
          setSelected(val)
          handleChange({ name: 'genre', value: data[parseInt(val) - 1].value })
          
        }}
        data={data}
        onSelect={() => handleChange({ name: 'genre', value: data[selected].value })}
      />
      <Text>Average number of pages read:</Text>
      <TextInput
        onChangeText={(value) => handleChange({ name: 'averageNumberOfPages', value })}
        placeholder="Average number of pages"
      />
      <Text>Total average number of pages read:</Text>
      <TextInput
        onChangeText={(value) => handleChange({ name: 'totalNumberOfPages', value })}
        placeholder="Total average number of pages"
      />


      <View>

        <Button title="Home"
          onPress={() => {
            navigation.navigate('Home')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="Genre"
          onPress={() => {
            navigation.navigate('Genre')
          }} />
      </View>
      <Text></Text>
      <View>
        <Button title="History"
          onPress={() => {
            navigation.navigate('History')
          }} />
      </View>
      <View>
        <Button title="Submit"
          onPress={handleSubmit} />
      </View>

    </View>
  )
}



const stack = createNativeStackNavigator();



const styles = StyleSheet.create({
  picture: {
    height: 180,
    width: 200,
  },

  thandeka: {
    fontSize: 44,
    backgroundColor: 'grey',
    textAlign: 'center',
  },
  lux: {
    fontSize: 22,
    color: 'green',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 24,
    color: 'green'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 46,
    fontWeight: '600',
    textAlign: 'center',
    fontWeight: 'bold',

  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',

  },

});

export default App;

