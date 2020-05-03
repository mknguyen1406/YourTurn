import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import {FlatList} from "react-native-gesture-handler";
import {Button} from 'react-native-material-ui';
import FeedItem from './FeedItem';
import Color from '../constants/Colors';

const CustomButton = (props) => {

    const onPressCustomButton = () => {
        let tmp = props.func_me_isActive; // workaround: old isActive state of the button, need in the fetch part
        let url = props.url;
        if (props.func_me_isActive) {
            props.func_me(false);
        } else {
            let c;
            for (c = 0; c < props.funcs.length; ++c) {
                props.funcs[c](false);
            }
            url += "&tag=" + props.tag;
        }
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then((response) => response.json())
            .then((json) => props.func(JSON.parse(json)))
            .then(() => {
                if (!tmp)
                    props.func_me(true)
            })
            .catch((error) => console.error(error))
    }

    let style_button_inactive = {
        container: {marginLeft: 10, borderRadius: 25, height: 30, backgroundColor: Color.tabColor},
        text: {fontSize: 18, color: Color.textPrimary}
    };
    let style_button_active = {
        container: {marginLeft: 10, borderRadius: 25, height: 40, backgroundColor: Color.highlightColor},
        text: {fontSize: 18, color: Color.textPrimary}
    };
    return (
        <Button
            upperCase={false}
            text={props.name}
            style={(props.func_me_isActive ? style_button_active : style_button_inactive)}
            onPress={onPressCustomButton}
            onLongPress={onPressCustomButton}
        />
    );
}

function Marius() {
    //const [text, setText] = React.useState('');
    const [fetchedData, setfetchedData] = useState([])
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [isActive1, setIsActive1] = useState(false)
    const [isActive2, setIsActive2] = useState(false)
    const [isActive3, setIsActive3] = useState(false)
    const [isActive4, setIsActive4] = useState(false)

    const base_url = "http://ec2-3-122-224-7.eu-central-1.compute.amazonaws.com:8080";
    const user_id = 1;  // change to real value once we have multiple users
    const challenges_url = `${base_url}/challenges?user_id=${user_id}`

    useEffect(() => {
        fetch(challenges_url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then((response) => response.json())
            .then((json) => setfetchedData(JSON.parse(json)))
            .catch((error) => console.error(error))
    }, []);

    function friendObjectsToImageSources(friendObjects) {
        return friendObjects.map(function (friendObject) {
            return `${base_url}/static/images/users/user${friendObject["id"]}.png`;
        });
    }

    function friendObjectsToName(friendObjects) {
        return friendObjects.map(function (friendObject) {
            return friendObject["name"];
        });
    }

    return (
        <View style={{flex: 1, backgroundColor: Color.backgroundColorLight}}>
            <View style={styles.wrapper}>
                <View style={styles.orderButtons}>
                    <ScrollView horizontal={true} style={styles.cb_scrollview}
                                contentContainerStyle={{alignItems: 'center'}}>
                        <CustomButton name="Sport" tag="Sport" func={setfetchedData}
                                      funcs={[setIsActive2, setIsActive3, setIsActive4]} func_me={setIsActive1}
                                      func_me_isActive={isActive1} url={challenges_url}/>
                        <CustomButton name="Green" tag="Sustainability" func={setfetchedData}
                                      funcs={[setIsActive1, setIsActive3, setIsActive4]} func_me={setIsActive2}
                                      func_me_isActive={isActive2} url={challenges_url}/>
                        <CustomButton name="Social" tag="Social" func={setfetchedData}
                                      funcs={[setIsActive1, setIsActive2, setIsActive4]} func_me={setIsActive3}
                                      func_me_isActive={isActive3} url={challenges_url}/>
                        <CustomButton name="Creative" tag="Creative" func={setfetchedData}
                                      funcs={[setIsActive1, setIsActive2, setIsActive3]} func_me={setIsActive4}
                                      func_me_isActive={isActive4} url={challenges_url}/>
                    </ScrollView>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10}}>
                        <Text style={{color: Color.textPrimary, fontSize: 18, marginRight: 10}}>Nearby</Text>
                        <Switch
                            trackColor={{false: Color.backgroundColorDark, true: Color.highlightColor}}
                            thumbColor={Color.elementWhite}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                <View style={{flex: 11, justifyContent: 'space-between'}}>
                    <FlatList
                        data={fetchedData}
                        renderItem={
                            ({item}) =>
                                <FeedItem
                                    ownerImageURI={`${base_url}/static/images/users/user${item.owner.id}.png`}
                                    ownerName={item.owner.name}
                                    challengeImageURI={`${base_url}/static/images/challenges/challenge${item.challenge_id}.png`}
                                    challengeTitle={item.name}
                                    friendsImages={friendObjectsToImageSources(item.participants)}
                                    friendsNames={friendObjectsToName(item.participants)}
                                    likes={item.likes.length}
                                    comments={item.comments}
                                    favorit={item.bookmarked}
                                    privateChallenge={item.private}
                                    coopetition={item.coopetition}
                                    description={item.description}
                                    tags={item.tags}
                                    proof={item.proof}
                                    voting={item.voting}
                                    bet={item.bet}
                                    deadline={item.deadline}
                                />
                        }
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontFamily: 'Arial'
    },
    orderButtons: {
        flex: 2,
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        flexDirection: 'column',
        marginTop: 20
    },
    cb_scrollview: {
        paddingTop: 10,
        paddingBottom: 10,
        height: '100%',
        flexDirection: 'row',
        paddingLeft: 10
    }
});

export default Marius;
