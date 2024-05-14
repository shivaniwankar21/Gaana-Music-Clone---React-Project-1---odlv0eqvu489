import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import * as React from "react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import action from "../../action";
function Footer() {
  // const [screenSize,setScreenSize]=useState();
  const dispatch = useDispatch();


  // useEffect(() => {
  //   const handleScreenSize = () => {
  //     setScreenSize(window.innerWidth > 960);
  //   };
  //   window.addEventListener("resize", handleScreenSize);

  //   return () => {
  //     window.removeEventListener("resize", handleScreenSize);
  //   };
  // }, []);

  const handleSongSelection = (selectedItem) => {    
    dispatch(action.setActiveItem(selectedItem));
  }
  const handleFacebookClick = () => {
    window.open(
      "https://www.facebook.com/gaana.com","_blank");
  };
  const handleTwitterClick = () => {
    window.open("https://twitter.com/gaana", "_blank");
  };
  return (
    <>
      <div className="footer">
          <div className="footer-section">
            <div className="footer-intro">
              <h2>Bas Bajna Chahiye Gaana</h2>
              <p className="intro-tag" style={{textAlign:"center"}}>
                Gaana is the one-stop solution for all your music needs. Gaana
                offers you free, unlimited access to over 30 million Hindi
                Songs, Bollywood Music, English MP3 songs, Regional Music &
                Mirchi Play.
              </p>
              <dir className="divide-line"></dir>
              <div className="social-media-icons">
                <SocialIcon
                  network="facebook"
                  className="social-icon"
                  fgColor="white"
                  bgColor="#3c5c9c"
                  style={{ cursor: "pointer" }}
                  onClick={handleFacebookClick}
                />
                <SocialIcon
                  network="twitter"
                  className="social-icon"
                  fgColor="white"
                  bgColor="#00acee"
                  style={{ cursor: "pointer" }}
                  onClick={handleTwitterClick}
                />
              </div>
              <dir className="divide-line"></dir>
              <div className="footer-terms-condition">

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <p className="Button violet">Terms of Use</p>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Description className="DialogDescription">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, id! Eaque asperiores neque saepe commodi tenetur consequuntur laboriosam explicabo quam omnis error, alias quisquam voluptatum temporibus id accusamus nemo ab?
                      </Dialog.Description>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <p className="Button violet">Privacy Policy</p>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Description className="DialogDescription">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis aliquam, sit quos aspernatur reprehenderit mollitia! Molestias, iste quia est totam officia aut quaerat cumque? Ullam reprehenderit id consequuntur neque error?
                      </Dialog.Description>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <p className="Button violet">Partners</p>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Description className="DialogDescription">
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ea explicabo vitae ex voluptatibus sit porro dolore suscipit quisquam, placeat molestias quaerat hic culpa voluptatem incidunt delectus quia? Perferendis, autem.
                      </Dialog.Description>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <p className="Button violet">FAQ</p>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Description className="DialogDescription">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit temporibus maiores nostrum sapiente ipsa vero adipisci ab corrupti obcaecati, excepturi blanditiis asperiores. Tenetur atque excepturi libero similique omnis rem deleniti.
                      </Dialog.Description>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>


              </div>
              <dir className="divide-line"></dir>

              <h3>Quick Links</h3>
              <div className="footer-content">
                <div className="row-1">
                  <div className="footer-row-content">
                    <h3>Soundscapes</h3>
                    <p>
                    <Link className="title" to={`/happy`} onClick={() => handleSongSelection("Happy Mood")}>
                      Upbeat tunes
                    </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        Thrilling tunes
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/sad`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Melancholic tunes
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/romance`}  onClick={()=>handleSongSelection("Moods & Genres")} >
                        Love ballads
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        Electrifying melodies
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/sad`} onClick={()=>handleSongSelection("Moods & Genres")} > 
                        Mournful ballads
                      </Link>
                    </p>
                  </div>
                  <div className="footer-row-content">
                    <h3>Genres</h3>
                    <p>
                      <Link className="title" to={`/sad`} onClick={()=>handleSongSelection("Moods & Genres")} > 
                        Heart-wrenching melodies
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Devotional Songs
                      </Link>
                    </p>

                    <p>
                      <Link className="title" to={`/album`} onClick={()=>handleSongSelection("Album")}>
                        Musical compositions
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        Enthusiastic beats
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/romance`}  onClick={()=>handleSongSelection("Moods & Genres")} >
                        Affectionate songs
                      </Link>
                    </p>
                  </div>
                  <div className="footer-row-content">
                    <h3>Musical traditions</h3>
                    <p>
                      <Link className="title" to={`/happy`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Joyful melodies
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/sad`} onClick={()=>handleSongSelection("Moods & Genres")} > 
                        Sorrowful music
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/romance`}  onClick={()=>handleSongSelection("Moods & Genres")} >
                        Heartfelt serenades
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/happy`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Cheerful music
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/allsongs`} onClick={()=>handleSongSelection("All Songs")} >
                        Track series
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        High-energy music
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/album`} onClick={()=>handleSongSelection("Album")}>
                        Album cuts
                      </Link>
                    </p>
                  </div>
                  <div className="footer-row-content">
                    <h3>Sound varieties</h3>
                    <p>
                      <Link className="title" to={`/allsongs`} onClick={()=>handleSongSelection("All Songs")} >
                        Soundtrack pieces
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/romance`}  onClick={()=>handleSongSelection("Moods & Genres")} >
                        Passionate music
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/happy`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Uplifting songs
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="row-2">
                  <div className="footer-row-content">
                    <h3>Energetic beats</h3>
                    <p>
                      <Link className="title" to={`/happy`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Peppy music
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/sad`} onClick={()=>handleSongSelection("Moods & Genres")} > 
                        Lively tempos
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/romance`}  onClick={()=>handleSongSelection("Moods & Genres")} >
                        Upbeat cadences
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/happy`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Vibrant pulses
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/allsongs`} onClick={()=>handleSongSelection("All Songs")} >
                        Energetic percussion
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        Dynamic rhythms
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/album`} onClick={()=>handleSongSelection("Album")}>
                        Pounding rhythms
                      </Link>
                    </p>
                  </div>
                  <div className="footer-row-content">
                    <h3>Rhythmic vitality</h3>
                    <p>
                      <Link className="title" to={`/romance`}  onClick={()=>handleSongSelection("Moods & Genres")} >
                        Enamored rhythms
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/happy`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Heart-pounding tracks
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/allsongs`} onClick={()=>handleSongSelection("All Songs")} >
                        Euphoric rhythms
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        High-energy music
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/happy`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Pulsating life force
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/allsongs`} onClick={()=>handleSongSelection("All Songs")} >
                        Tender compositions
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        High-energy music
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/album`} onClick={()=>handleSongSelection("Album")}>
                        Amorous melodies
                      </Link>
                    </p>
                  </div>
                  <div className="footer-row-content">
                    <h3>Lyrics</h3>
                    <p>
                      <Link className="title" to={`/sad`} onClick={()=>handleSongSelection("Moods & Genres")} > 
                        Sentimental tunes
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Happy Mood")}>
                        Jingle Bells Lyrics
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/allsongs`} onClick={()=>handleSongSelection("All Songs")} >
                        Vivacious drumming
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Memories Lyrics
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/romance`}  onClick={()=>handleSongSelection("Moods & Genres")} >
                        Pulsing life
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/sad`} onClick={()=>handleSongSelection("Moods & Genres")} > 
                        Dynamic heartthrobs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/exited`} onClick={()=>handleSongSelection("Exciting Harmony")} >
                        Energetic thumping
                      </Link>
                    </p>
                  </div>
                  <div className="footer-row-content">
                    <h3>Old Songs</h3>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Hindi Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old English Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Punjabi Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Telugu Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Tamil Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Bengali Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Bhojpuri Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Malayalam Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Kannada Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Marathi Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Gujarati Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Haryanvi Songs
                      </Link>
                    </p>
                    <p>
                      <Link className="title" to={`/comingsoon`} onClick={()=>handleSongSelection("Moods & Genres")} >
                        Old Urdu Songs
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <dir className="divide-line"></dir>
              <div className="copy-right">
                &copy; Gamma Gaana Ltd.2023, All rights Reserved  Oswald Cardoz
              </div>
            </div>
          </div>
        <div className="dummy-spacing"></div>
      </div>
    </>
  );
}

export default Footer;
