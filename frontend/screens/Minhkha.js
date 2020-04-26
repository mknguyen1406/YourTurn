// import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, View, Image, TextInput, Dimensions, ImageBackground, TouchableHighlight} from 'react-native';
// import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from "../constants/Colors"
import FeedItem from './FeedItem';
// import Collapsible from 'react-native-collapsible';

// import { MatButton } from 'react-native-material-ui';
// import { Checkbox } from 'react-native-material-ui'
// import { Badge, Icon, Avatar } from 'react-native-material-ui';
// import { RadioButton } from 'react-native-material-ui';
// import { ActionButton } from 'react-native-material-ui';

import { Text } from 'galio-framework';
import { Card as GCard } from 'galio-framework';
import { Button } from 'galio-framework';
import { Icon } from 'galio-framework';
import { Slider, Block } from 'galio-framework';

import { Ionicons, Entypo, Octicons } from '@expo/vector-icons';

import { Card } from 'react-native-material-ui';

const API_URL_CHALLENGE = "http://ec2-3-122-224-7.eu-central-1.compute.amazonaws.com:8080/challenges/"
const API_URL_USER = "http://ec2-3-122-224-7.eu-central-1.compute.amazonaws.com:8080/users/"

const ChallengeDetails = (props) => {
  return (
    <View>

      <View style={styles.tagContainer}>
        {
          props.tagList.map( (tag) =>
          <Button
            color={Colors.tabColor}
            style={styles.tagStyle}
          >
            {"#" + tag}
          </Button>
          )
        }
      </View>

      <View style={styles.rowContainer}>
        <Text h5 bold color={Colors.textPrimary}>Proof</Text>
        <Button
          color={Colors.highlightColor}
          style={styles.proofStyle}
        >
          {props.proof}
        </Button>
      </View>

        {/*
      <View style={styles.rowContainer}>
        <Text h5 bold color={Colors.textPrimary}>Voting</Text>
        <Button
          color={Colors.highlightColor}
          style={styles.proofStyle}
        >
          {props.voting}
        </Button>
      </View>


      <View style={styles.rowContainer}>
        <Text h5 bold color={Colors.textPrimary}>Bet</Text>
        <Button
          color={Colors.highlightColor}
          style={styles.proofStyle}
        >
          {props.bet}
        </Button>
      </View>
      */}

      <View style={styles.rowContainer}>
        <Text h5 bold color={Colors.textPrimary}>Deadline</Text>
        <Button
          color={Colors.highlightColor}
          style={styles.proofStyle}
        >
          {props.deadline}
        </Button>
      </View>

      <View style={styles.rowContainer}>
        <Text h5 bold color={Colors.textPrimary}>Progress</Text>
        <Block style={styles.progressContainer}>
          <Slider
            // disabled
            maximumValue={30}
            value={10}
            activeColor={Colors.highlightColor}
          />
        </Block>
      </View>

      <View style={styles.buttonContainer}>
          {/*
        <Button
          onlyIcon
          icon="thumbs-up"
          iconFamily="Entypo"
          iconSize={25}
          color={Colors.tabColor}
          iconColor={Colors.highlightColor}
          style={styles.secondaryButtonStyle} />

        <Button
          onlyIcon
          icon="comment"
          iconFamily="MaterialIcons"
          iconSize={25}
          color={Colors.tabColor}
          iconColor={Colors.highlightColor}
          style={styles.secondaryButtonStyle} />
        */}

        <Button
          onlyIcon
          icon="add-user"
          iconFamily="Entypo"
          iconSize={25}
          color={Colors.tabColor}
          iconColor={Colors.highlightColor}
          style={styles.secondaryButtonStyle}
          onPress={props.onPressAddUser}
        />


          {/*<Button
          onlyIcon
          icon="check"
          iconFamily="Entypo"
          iconSize={30}
          color={Colors.highlightColor}
          iconColor={Colors.elementWhite}
          style={{ width: 100, height: 50 }}
          onPress={props.onPressDone}
        />
        */}

        <TouchableHighlight
            onPress={props.onPressDone} >
              <Image
                    source={require('../assets/images/Logo.png')}
                    style={{width: 100, height: 50, marginTop: 10}}
                    onPress={props.onPressDone} />
        </TouchableHighlight>

        <Button
          onlyIcon
          icon="share"
          iconFamily="Entypo"
          iconSize={25}
          color={Colors.tabColor}
          iconColor={Colors.highlightColor}
          style={styles.secondaryButtonStyle} />
      </View>
  </View>
  )
}

const AddUser = (props) => {
  // console.log(props.friendList[0].name)
  return (
    <View>

        <View style={{marginTop: 40}}>
          <Text p bold color={Colors.textPrimary}>Select your friends you would like to add</Text>
        </View>

        <UserCard
          title={props.friendsNames[0]}
          image={props.friendsImages[0]}
          subtitle="Friend"
        />
        <UserCard
          title={props.friendsNames[1]}
          image={props.friendsImages[1]}
          subtitle="Friend"
        />

        {/* {props.friendList.map( (friend) => {

          <UserCard
            title={friend.name}
            subtitle="Friend"
          />

          console.log(friend.name)
          })
        } */}

      <View style={{alignItems: "center", marginTop: 20}}>
        <Button
          onlyIcon
          icon="check"
          iconFamily="Entypo"
          iconSize={30}
          color={Colors.highlightColor}
          iconColor={Colors.elementWhite}
          style={{ width: 100, height: 50 }}
          onPress={props.onPressAddUserFinished}
        />
    </View>
  </View>
  )
}

const UserCard = (props) => {

  const [buttonPressed, setButtonPressed] = React.useState(false);

  const onPressUserCard = () => {
    setButtonPressed(!buttonPressed)
    console.log("pressed user card")
  }

  return (
    <View style={{backgroundColor: Colors.backgroundColorLight}}>

      <View style={styles.ownerCard} >
      {/* <Button onPress={onPressUserCard} style={{height: "100%", width: "100%"}}>
          <GCard
          flex
          borderless
          style={!buttonPressed ? styles.ownerInnerCard : styles.ownerInnerCardPressed}
          title={props.title}
          caption={props.subtitle}
          location="Frankfurt, Germany"
          avatar="http://i.pravatar.cc/100?id=skater"
        />
        </Button> */}

        <View style={styles.headerFeedItem}>
            <Image source={props.image} style={styles.ownerImageFeedItem}/>
            <View style={styles.headerFeedItemText}>
                <Text color={Colors.textPrimary} bold h5>{props.title}</Text>
                <Text color={Colors.textSecondary} p>Friend</Text>
            </View>

            <View style={styles.Divi}></View>
        </View>

      </View>
    </View>
  )
}

const Done = (props) => {

  return (
    <View style={styles.center}>
          <Icon
            name="check-circle"
            family="Feather"
            color={Colors.highlightColor}
            size={200}
            style={{marginTop: 40}}
          />

        <View style={{marginTop: 40}}>
          <Text p bold color={Colors.textPrimary}>Congrats! You mastered this challenge.</Text>
        </View>

        <View style={{alignItems: "center", marginTop: 40}}>
          <Button
            color={Colors.highlightColor}
            style={{ width: 100, height: 50 }}
            onPress={props.onPressDoneFinished}
          > Back </Button>
      </View>
    </View>
  )
}

export default function Minhkha(props) {

  const onPressAddUser = (event) => {
    // console.log(event);
    setAddUserOpen(true);
    setChallengeDetailsOpen(false);
  }

  const onPressDone = (event) => {
    // console.log(event);
    setDoneOpen(true);
    setChallengeDetailsOpen(false);
  }

  const onPressAddUserFinished = (event) => {
    // console.log(event);
    setAddUserOpen(false);
    setChallengeDetailsOpen(true);
  }

  const onPressDoneFinished = (event) => {
    // console.log(event);
    setDoneOpen(false);
    setChallengeDetailsOpen(true);
  }


// Get all initial state data from server
// const getIndividualElementRequest = (api, id) => {

//   const url = api + id.toString()

//   // Send HTTP POST request with project name and material number to server
//   return fetch(url, {
//     method: 'GET',
//     headers: new Headers({
//               'Content-Type': 'application/json'
//             }),
//   })
//     .then(res => res.json())
//     .then(
//       result => {
//         console.log("Result received from server: ", result);

//         // Execute callback function which sets the parameters from the result file
//         if (result !== null) {
//           return result;
//         }

//       },
//       (error) => {
//         console.log(error);
//       }
//     )
// };

// const setChallengeParameters = (result) => {

//   const res = JSON.parse(result)

//   setName(res.name)
//   setOwnerId(res.owner.name)
//   setDescription(res.description)
//   setTagList(res.tags)
//   setProof(res.proof)
//   setVoting(res.voting.toString())
//   setBet(res.bet)
//   setDeadline(parseDate(res.deadline["$date"]))
//   setIsPrivate(res.private)
//   setParticipantList(res.participants)
//   setLikeList(res.likes)
//   setCosts(res.costs)
//   setCompletetUserList(res.completed_users)

//   setDataLoaded(true)

// };

// const setUserParameters = (result) => {

//   const res = JSON.parse(result)
//   setFriendList(res.friends)

// };

const parseDate = (date) => {
  const parsedDate = new Date(date)
  const dateNow = Date.now()
  const dateDif = new Date(parsedDate - dateNow)

  return (dateDif.getUTCDate()).toString() + " days left"
}

  const [showPic, setShowPic] = React.useState(true);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const [name, setName] = React.useState();
  const [ownerId, setOwnerId] = React.useState();
  const [description, setDescription] = React.useState();
  const [tagList, setTagList] = React.useState();
  const [proof, setProof] = React.useState();
  const [voting, setVoting] = React.useState();
  const [bet, setBet] = React.useState();
  const [deadline, setDeadline] = React.useState();
  const [isPrivate, setIsPrivate] = React.useState();
  const [participantList, setParticipantList] = React.useState();
  const [likeList, setLikeList] = React.useState();
  const [costs, setCosts] = React.useState();
  const [completetUserList, setCompletetUserList] = React.useState();

  const [friendList, setFriendList] = React.useState();

  const [dataLoaded, setDataLoaded] = React.useState(false);

  const [challengeDetailsOpen, setChallengeDetailsOpen] = React.useState(true);
  const [doneOpen, setDoneOpen] = React.useState(false);
  const [addUserOpen, setAddUserOpen] = React.useState(false);


  // Get values for chart and table data as well as meta data - ONLY ONCE
  // React.useEffect( () => {

    // setName("Liegestütze")
    // setOwnerId("123")
    // setDescription("Hiermit fordere ich dich zu 100 Liegestützen heraus, du kleiner Bastard amk!")
    // setTagList(["sport", "bastard", "pump"])
    // setProof("photo")
    // setVoting("yes")
    // setBet("coins")
    // setDeadline("in 2 days")
    // setIsPrivate(true)
    // setParticipantList(["Manu", "Arne", "Timo", "Arne", "Nils", "Malte"])
    // setLikeList(["Manu", "Arne", "Timo"])
    // setCosts(10)
    // setCompletetUserList(["Minh-Kha"])

    // Get challenge data
    // getIndividualElementRequest(API_URL_CHALLENGE, 1).then( result => setChallengeParameters(result) )

    // Get user data
    // getIndividualElementRequest(API_URL_USER, 1).then( result => setUserParameters(result) )

  // }, []);

  console.log(props)

  return (

    <ScrollView style={styles.container}>

        <View
         style={styles.card}
        >
          <Card>

            <View style={styles.contentContainer}>

              <View style={styles.descriptionContainer}>
                <Text p color={Colors.textPrimary}>{props.description}</Text>
              </View>

              {challengeDetailsOpen &&
              <ChallengeDetails
                tagList={props.tagList}
                proof={props.proof}
                voting={props.voting}
                bet={props.bet}
                deadline={parseDate(props.deadline)}
                onPressAddUser={onPressAddUser}
                onPressDone={onPressDone}
              />
              }

              {addUserOpen &&
              <AddUser
                friendsNames={props.friendsNames}
                friendsImages={props.friendsImages}
                onPressAddUserFinished={onPressAddUserFinished}
              />
              }

              {doneOpen &&
              <Done
                onPressDoneFinished={onPressDoneFinished}
              />
              }

              <View style={{alignItems: "center", marginTop: 30}}>
                <Button
                  onlyIcon
                  icon="up"
                  iconFamily="AntDesign"
                  iconSize={25}
                  color={Colors.backgroundColorLight}
                  iconColor={Colors.elementWhite}
                  style={styles.secondaryButtonStyle}
                  onPress={props.onPressDetails}
                />
              </View>

              <View style={styles.footerDivider}></View>

            </View>
          </Card>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.highlightColor,
  },

  card: {
    width: "100%",
    padding: 0,
    margin: 0,
    // backgroundColor: Colors.highlightColor,
    textShadowRadius: 0,
    shadowColor: Colors.backgroundColorLight,

  },

  ownerCard: {
    marginTop: 20,
    flex: 1,
    padding: 0,
    height: 80,
    width: "100%",
    backgroundColor: Colors.backgroundColorLight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center"
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: Colors.backgroundColorLight,
  },

  image: {
    marginTop: 0,
    width: '100%',
    height: 300,
    borderRadius: 0,
  },

  contentContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: Colors.backgroundColorLight
  },

  titleContainer: {
    alignItems: "flex-start",
    marginBottom: 20
  },

  descriptionContainer: {
    alignItems: "flex-start"
  },


  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    margin: 15,
  },

  tagStyle: {
    width: 80,
    height: 30,
    marginRight: 10,
  },

  rowContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: "space-between",
  margin: 10,
  },

  feedbackContainer: {
  backgroundColor: Colors.backgroundColorLight
  },

  feedback: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    margin: 10
  },

 proofStyle: {
  width: 150,
  height: 30,
  marginLeft: 10,
  },

  progressContainer: {
    flex: 1,
    paddingLeft: 50
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 20
  },

  secondaryButtonStyle: {
    width: 55,
    height: 50,
  },

  center: {
    // flex: 1,
    // flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },

  footerDivider: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: Colors.tabColor,
    borderBottomWidth: 2,
  },

  ownerImageFeedItem: {
    height: 60,
    width: 60,
    marginRight: 10,
    borderRadius: 50
  },
  headerFeedItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerFeedItemText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },

});
