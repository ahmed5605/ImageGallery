import React, { Component } from 'react'
import { Text,AsyncStorage,RefreshControl, View, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'

const width = Dimensions.get("window").width;

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
        data: [],
        loader: true,
        recentImage: null,
        showError: false
    }
}

    componentDidMount(){
        this.fetch_data()

        this.readData()
        //this.clearAllData()
    }

    clearAllData() {
        AsyncStorage.removeItem('STORAGE_KEY');
    }


    fetch_data(){
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s')
            .then((response) => response.json())
            .then((json) => {
                
                this.setState({data: json.photos.photo, loader: false,})
            })
            .catch((error) => {
                console.error(error);
                
                this.setState({showError: true,loader: false,})
        });
    }

    renderImages(){
        return(
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}} >
                {this.state.data.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => this.setRecentImage(item.url_s)} >
                        <Image
                            source={{uri: item.url_s}}
                            style={{height: 250, width: width/2}}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        )
    }


    renderRecentImage(){
        return(
            <View>
                <Image
                    source={{uri: this.state.recentImage}}
                    style={{height: 300, width: width}}
                />
            </View>
        )
    }

    setRecentImage(url){
        this.setState({recentImage: url})
        this.saveData(url)
    }


    renderLoader(){
        return(
            <View style={{flex:1, justifyContent: 'center'}} >
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }


  saveData = async (url) => {
    try {
      await AsyncStorage.setItem('STORAGE_KEY', url);
      console.log('data saved');
      //alert('Data successfully saved')
    } catch (e) {
        console.log('failed');
      //alert('Failed to save the data to the storage ' )
      console.log(e);
    }
  }

  readData = async () => {
    try {
      const recentImage = await AsyncStorage.getItem('STORAGE_KEY');
  
      if (recentImage !== null) {
       this.setState({recentImage: recentImage})
        // alert('recentImage: '+ recentImage)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  onRefresh(){
    this.setState({refreshing: true})
    console.log("refrs");
    this.fetch_data();
  }


  render() {
    return (
        <>
        {this.state.loader
        ?
        <>
        {this.renderLoader()}
        </>
        :
        <View>
            {this.state.recentImage
            ?
            <>
                {this.renderRecentImage()}
                <View style={{height: 50, backgroundColor: 'white', borderWidth: 1,margin: 2, justifyContent: 'center',}} >
                    <Text style={{fontSize: 24, marginLeft: 10}} >Images</Text>
                </View>
            </>
            :
            null
            }
            <ScrollView>
            
                {this.state.showError
                ?
                <View style={{flex: 1, backgroundColor: 'white',height: 400}} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}} >
                    <Text style={{fontSize: 22}} >Check Your Internet Connection!</Text>
                    </View>
                </View>
                :
                null
                }

                {this.renderImages()}
            </ScrollView>
        </View>
        }
        </>
    )
  }
}
