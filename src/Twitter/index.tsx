import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { getPostData, ITwitterPost } from "./api";
import { parse, format } from "date-fns";
import { Header, HeaderQuote } from "./Header";
import { formatLikeNumber, getFormattedTimeByLanguage } from "./utils";
import { ImageGallery } from "./ImageGallery";
import { TwitterText } from "./TwitterText";
import { TwitterVideo } from "./Video";
import { LinkPreview } from "./LinkPreview";

interface PropsType {
  id: string;
  consumerKey: string;
  consumerSecret: string;
  language?: "en" | "fr" | "es" | "pt" | "it" | "de" | "ru";
  onHashTagPress?: (hashtag: string) => void;
  onUserMentionPress?: (userMention: string) => void;
  onLinkPress?: (link: string) => void;
  cornerRadius?: "small" | "big";
}

export const Twitter = (props: PropsType) => {
  const {
    id,
    language,
    onHashTagPress,
    onLinkPress,
    onUserMentionPress,
    consumerKey,
    consumerSecret,
    cornerRadius,
  } = props;
  const [data, setData] = React.useState<ITwitterPost | null>(null);
  React.useEffect(() => {
    getPostData(id, consumerKey, consumerSecret).then((response) => {
      setData(response);
    });
  }, [setData]);
  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      {data ? (
        <>
          <Header
            posterImageUrl={data.posterImageUrl}
            posterDisplayName={data.posterDisplayName}
            posterUniqueName={data.posterUniqueName}
            isPosterVerified={data.isPosterVerified}
          />
          <View style={styles.headerSeparator} />
          <View>
            <TwitterText
              styles={styles.mainContentText}
              urls={data.urlList}
              hashtags={data.hashtagList}
              userMentions={data.userMentionList}
              quoteUrlId={data.quoteUrlId}
            >
              {data.textContent}
            </TwitterText>
          </View>
          {data?.media?.[0]?.type === "video" ? (
            <View style={styles.embedContainer(cornerRadius)}>
              <TwitterVideo
                source={data.media[0].url}
                aspectRatio={data.media[0].aspectRatio}
                poster={data.media[0].posterUrl}
              />
            </View>
          ) : data?.media?.[0]?.type === "photo" ? (
            <View style={styles.embedContainer(cornerRadius)}>
              <ImageGallery medias={data.media} />
            </View>
          ) : data?.urlList?.[0] && !data?.isQuote ? (
            <View style={styles.embedContainer(cornerRadius)}>
              <LinkPreview
                url={data?.urlList?.[0]?.expanded_url}
                onLinkPress={onLinkPress}
              />
            </View>
          ) : null}
          {data?.isQuote ? (
            <View style={styles.embedContainer(cornerRadius)}>
              <View style={{ margin: 10 }}>
                <HeaderQuote
                  isPosterVerified={data.quotedTweet.isPosterVerified}
                  posterUniqueName={data.quotedTweet.posterUniqueName}
                  posterImageUrl={data.quotedTweet.posterImageUrl}
                  posterDisplayName={data.quotedTweet.posterDisplayName}
                />
                <TwitterText
                  urls={data.quotedTweet.urlList}
                  hashtags={data.quotedTweet.hashtagList}
                  userMentions={data.quotedTweet.userMentionList}
                  quoteUrlId={data.quotedTweet.quoteUrlId}
                  {...{ onHashTagPress, onLinkPress, onUserMentionPress }}
                  styles={styles.quotedContentText}
                >
                  {data.quotedTweet.textContent}
                </TwitterText>
              </View>
              {data?.quotedTweet?.media?.[0]?.type === "video" ? (
                <TwitterVideo
                  source={data.quotedTweet.media[0].url}
                  aspectRatio={data.quotedTweet.media[0].aspectRatio}
                  poster={data.quotedTweet.media[0].posterUrl}
                />
              ) : data?.quotedTweet?.media?.[0]?.type === "photo" ? (
                <ImageGallery medias={data?.quotedTweet?.media} />
              ) : null}
            </View>
          ) : null}
          <View style={styles.metadataRowContainer}>
            <Image
              source={require("./assets/heart.png")}
              style={{
                width: 18,
                height: 18,
                tintColor: "rgb(105, 120, 130)",
                marginRight: 4,
              }}
            />
            <Text style={styles.metadataRowText}>
              {formatLikeNumber(data?.likeNumber) +
                "    " +
                format(
                  parse(
                    data?.createdAt,
                    "EEE MMM dd HH:mm:ss xx yyyy",
                    new Date()
                  ),
                  getFormattedTimeByLanguage(language).format,
                  { locale: getFormattedTimeByLanguage(language).locale }
                )}
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

Twitter.defaultProps = {
  cornerRadius: "small",
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  profilePicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  profileBanner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  displayNameText: {
    color: "rgb(28, 32, 34)",
    fontSize: 16,
    fontWeight: "700",
  },
  uniqueNameText: {
    color: "rgb(105, 120, 130)",
    fontSize: 14,
    fontWeight: "400",
  },
  nameContainer: {
    marginLeft: 10,
    justifyContent: "space-between",
  },
  headerSeparator: {
    height: 12,
  },
  mainContentText: {
    color: "rgb(28, 32, 34)",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  quotedContentText: {
    color: "rgb(28, 32, 34)",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
  },
  metadataRowText: {
    color: "rgb(105, 120, 130)",
    fontSize: 14,
    fontWeight: "500",
  },
  metadataRowContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  // @ts-ignore wrong react-native style
  embedContainer: (cornerRadius: "big" | "small") => ({
    borderColor: "rgb(204, 214, 221)",
    borderWidth: 0.7,
    borderRadius: cornerRadius === "big" ? 12 : 4,
    marginTop: 10,
    overflow: "hidden",
  }),
});