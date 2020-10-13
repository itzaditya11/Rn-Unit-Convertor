import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet, TextInput} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {Picker} from '@react-native-community/picker';
import convert from 'convert-units';
import Icon from 'react-native-vector-icons/FontAwesome';

const measures = convert().measures();
const mainColor = '#052F5F';
const MeasureView = ({measure}) => {
  const units = convert().possibilities(measure);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1]);
  const [value, setValue] = useState('0');
  const [valueConverted, setValueConverted] = useState(0);
  useEffect(() => {
    setValueConverted(
      convert(+value)
        .from(fromUnit)
        .to(toUnit)
        .toFixed(3),
    );
  }, [value, fromUnit, toUnit]);
  return (
    <View style={styles.scene}>
      <View style={styles.row}>
        <Picker
          style={styles.column}
          selectedValue={fromUnit}
          onValueChange={setFromUnit}>
          {units.map((unit, i) => (
            <Picker.Item label={unit} value={unit} key={i} />
          ))}
        </Picker>
        <View style={styles.column}>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Icon name="youtube-square" size={30} color="#000" />
      </View>
      <View style={styles.row}>
        <Picker
          style={styles.column}
          selectedValue={toUnit}
          onValueChange={setToUnit}>
          {units.map((unit, i) => (
            <Picker.Item label={unit} value={unit} key={i} />
          ))}
        </Picker>
        <View style={styles.column}>
          <Text style={[styles.input, {fontSize: 30, fontWeight: 'bold'}]}>
            {valueConverted}
          </Text>
        </View>
      </View>
    </View>
  );
};
function unCamelCase(value) {
  return value.replace(/([A-Z])/g, ' $1');
}
const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    measures.map((m) => ({key: m, title: unCamelCase(m)})),
  );
  const renderScene = ({route}) => {
    return <MeasureView measure={route.key} />;
  };

  return (
    <View style={styles.scene}>
      <Text style={styles.title}>Unit converter</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            tabStyle={{width: 'auto'}}
            indicatorStyle={{backgroundColor: '#fff'}}
            style={{backgroundColor: mainColor}}
          />
        )}></TabView>
    </View>
  );
};
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    color: mainColor,
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    borderColor: mainColor,
    borderBottomWidth: 1,
    fontSize: 20,
    textAlign: 'center',
  },
});
export default App;
