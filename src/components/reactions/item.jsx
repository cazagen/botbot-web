import React from 'react';
import { replace } from 'lodash-es';

/**
* Get YouTube ID from various YouTube URL
* @author: takien
* @url: http://takien.com
*/

function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}


class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var props = Object.assign({}, this.props);
    var src = props.src;
    delete props.src;

    if (src.endsWith(".mp4") || src.endsWith(".gifv") || src.endsWith(".webm")) {
      var type = "";
      let sources = [];
      if (src.endsWith(".gifv") || src.endsWith(".webm")) {
        type = "video/webm";
        sources.push(<source src={src} type={type} />)

        src = replace(src, ".gifv", ".webm")
        sources.push(<source src={src} type={type} />)

        src = replace(src, ".webm", ".mp4")
        sources.push(<source src={src} type={type} />)
      } else {
        sources.push(<source src={src} />)
      }

      return (
        <video className="responsive-video" {...props}>
          {sources}
        </video>
      )
    } else if (src.includes("youtube") || src.includes("youtu.be")) {
      let youtube_id = YouTubeGetID(src);
      if (props.thumb) {
        let youtube_thumb = "//img.youtube.com/vi/" + youtube_id + "/maxresdefault.jpg"
        return <img {...props} className="responsive-img" src={youtube_thumb} />
      } else {
        let youtube_embed = "//www.youtube.com/embed/" + youtube_id;
        return (
          <div className="video-container">
            <iframe src={youtube_embed} frameBorder={0}></iframe>
          </div>
        )
      }
    } else if (src.includes("gfycat")) {
      let id = src.split("/")[3];

      if (props.thumb) {
        let thumb_url = "//thumbs.gfycat.com/" + id + "-poster.jpg";
        return <img {...props} src={thumb_url} className="responsive-img" />
      } else {
        let ifr="//gfycat.com/ifr/" + id;
        return (
          <div className="video-container">
            <iframe src={ifr} frameBorder={0}></iframe>
          </div>
        )
      }
    } else if (src.includes(".png") || src.includes(".jpg") || src.includes(".jpeg") || src.includes(".gif")) {
      return <img {...props} src={src} className="responsive-img" />
    } else if (src.includes("giphy")) {
      let parts = src.split("/");
      
      if (props.thumb) {
        let url = "//media.giphy.com/media/" + parts[parts.length - 1] + "/giphy.gif";
        return <img {...props} className="responsive-img" src={url} />
      } else {
        let url = "//giphy.com/embed/" + parts[parts.length - 1];
        return (
          <div className="video-container">
            <iframe src={url} frameBorder={0}></iframe>
          </div>
        )
      }
    } else {
      return <a href={src}>{src}</a>
    }
  }
}

export default Item;