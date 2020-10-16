import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import StackGrid from "react-stack-grid";
import Modal  from "@material-ui/core/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'

const baseUrl = "https://api.unsplash.com";
const a = process.env.ACCESS_KEY;

export default () => {
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pg, setPg] = useState(1);
  useEffect(() => {
    getPhotos();
  }, []);
  const getPhotos = async () => {
    const res = await Axios({
      method: "GET",
      url: `${baseUrl}/photos`,
      params: { page: pg },
      headers: {
        Authorization: `Client-ID ${a}`
      }
    });
    setPhotos([...photos, ...res.data]);
    setPg(pg + 1);
  };
  return (
    <>
      <Navbar />
      <InfiniteScroll
        scrollThreshold={0.94}
        dataLength={photos.length} //This is important field to render the next data
        next={getPhotos}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <StackGrid columnWidth={300}>
          {photos.length > 0 &&
            photos.map((item, i) => (

              <div className="img" key={item.id}>
                <img
                  onClick={() => setSelected(item)}
                  style={{ width: "100%", height: "auto" }}
                  src={item.urls.thumb}
                  alt={item.alt_description}
                  />
              </div>
            ))}
        </StackGrid>
      </InfiniteScroll>
      {selected && (
        <>
        <Modal
          open={selected && true}
          onClose={() => setSelected(false)}
          className="center"
        >     
          <div
            style={{
              width: "80vw",
              height: "70vh",
              background: "white",
              padding: 20,
              maxWidth: "80vw"
            }}
            className="center"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `url(${selected.urls.regular}) center/contain no-repeat`
              }}
            />
        <ArrowBack onClick={() => {
          const indexNo = photos.findIndex(i => i.id === selected.id)
          if(indexNo !== 0){
            setSelected(photos[indexNo-1])
          } else{
            setSelected(photos[indexNo])
          }
        }} style={{
          position: 'absolute',
          top: '50%', left: 20,
          transform: 'translate(-50%,-50%)',
          cursor: 'pointer'
        }} />
          <ArrowForward onClick={() => {
          const indexNo = photos.findIndex(i => i.id === selected.id)
          if(indexNo !== photos.length-1){
            setSelected(photos[indexNo+1])
          } else{
            setSelected(photos[indexNo])
          }
        }} style={{
            position: 'absolute',
            top: '50%', right: 10,
            transform: 'translate(-50%,-50%)',
            cursor: 'pointer'
          }} />
          </div>
        </Modal>


          </>
      )}
    </>
  );
};
