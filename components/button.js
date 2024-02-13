import * as React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Entypo} from '@expo/vector-icons'

export default function Button({onPress, icon, color}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo name={icon} size={70} color={color ? color : '#f1f1f1'}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})