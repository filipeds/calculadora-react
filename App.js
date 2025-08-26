import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";

export default function App() {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [historyText, setHistoryText] = useState(null);

    const buttons = [
        ['C', '+/-', '%', '/'],
        ['7', '8', '9', 'X'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '=']
    ];

    const handlePress = (button) => {
        console.log("Botão clicado:", button);
        if (!isNaN(button) || button === '.') {
            setDisplayValue(displayValue === '0' ? button : displayValue + button);
        } else if (button === 'C') {
            setDisplayValue('0');
            setPreviousValue(null);
            setOperator(null);
            setHistoryText(' ');
        } else if (['/', 'X', '-', '+'].includes(button)) {
            setOperator(button);
            setPreviousValue(displayValue);
            setDisplayValue('0');
            setHistoryText(displayValue + ' ' + button);
        } else if (button === '=') {
            if (!previousValue || !operator) {
                return;
            }
            const firstValue = parseFloat(displayValue);
            const secondValue = parseFloat(displayValue);
            let result = 0;
            setHistoryText(previousValue + ' ' + operator + ' ' + displayValue + ' =');

            switch (operator){
                case '+': result = firstValue + secondValue; break;
                case '-': result = firstValue - secondValue; break;
                case 'X': result = firstValue * secondValue; break;
                case '/': result = firstValue / secondValue; break;
            }
            setDisplayValue(String(result));
            setPreviousValue(null);
            setOperator(null);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.display}>
                <Text style={styles.historyText}>{historyText}</Text>
                <Text style={styles.displayText}>{displayValue}</Text>
            </View>

            <View style={styles.buttonsContainer}>
                {buttons.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.buttonRow}>
                        {row.map((button) => (
                            <TouchableOpacity key={button} style={styles.button} onPress={() => handlePress(button)}>
                                <Text style={styles.buttonText}>{button}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#000'
    },
    display: {
        flex:2,
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        padding:20
    },
    historyText:{
        fontSize:24,
        color:'#888'
    },
    displayText:{
        fontSize:70,
        color: '#fff'
    },
    buttonsContainer: {
        flex: 3,
        paddingHorizontal:10
    },
    buttonRow: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
        marginVertical: 5
    },
    button:{
        backgroundColor: '#333',
        width: 80,
        height: 80,
        borderRadius: 40, 
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText: {
        fontSize: 32,
        color: '#fff'
    }

})