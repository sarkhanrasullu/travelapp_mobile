import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  View,
  Text,
  Container,
  Content,
  Footer
} from "native-base";
import * as theme from "../../theme";
import Gallery from "../../components/Gallery";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  welcomeCol: {
    paddingTop: 10
  },
  flex: {
    flex: 0
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2
  },
  avatar: {
    position: "absolute",
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 15,
    lineHeight: 15,
    color: theme.colors.caption
  }
});

class InfoPage extends Component {
  state = {
    readMore: false
  };

  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={theme.sizes.font}
          color={theme.colors[activeStar ? "active" : "gray"]}
          style={{ marginRight: 4 }}
        />
      );
    });
  };

  renderInfo = () => {
    const {info, avatarThumbnail, avatarTitle, reviewAvg, reviewCount} = this.props;
    let description = info;
    let readMoreButton = null;

    if (!this.state.readMore && info && info.length > 180) {
      description = info.substring(0, 180);
      readMoreButton = (
        <Text
          style={{ color: theme.colors.active,fontSize:15 }}
          onPress={() => {
            this.setState({ readMore: true });
          }}
        >
          {" "}
          Read more
        </Text>
      );
    }

    return (
      <View style={[styles.flex, styles.content]}>
        <View style={[styles.flex, styles.contentHeader]}>
          <Image
            style={[styles.avatar, styles.shadow]}
            source={{ uri: `data:image/jpg;base64,${avatarThumbnail}` }}
          />
          <Text style={styles.title}>{avatarTitle}</Text>
          <View
            style={[
              styles.row,
              { alignItems: "center", marginVertical: theme.sizes.margin / 2 }
            ]}
          >
            {this.renderRatings(reviewAvg)}
            <Text style={{ color: theme.colors.active,fontSize:15 }}>{reviewAvg}</Text>
            <Text style={{ marginLeft: 8, color: theme.colors.caption,fontSize:15 }}>
              ({reviewCount} reviews)
            </Text>
          </View>
          <Text style={styles.description}>
            {description}
            {readMoreButton}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { images, footer, footerHeight } = this.props;

    return (
      <Container>
        <Content>
          <ScrollView style={styles.flex}>
            <Gallery images={images} width={width} height={width}/>
            {this.renderInfo()}
          </ScrollView>
        </Content>
        {
            footer? 
            <Footer style={{height:footerHeight?footerHeight:200}}>
              {footer}
            </Footer>:null
        }
      
      </Container>
    );
  }
}

export default InfoPage;
