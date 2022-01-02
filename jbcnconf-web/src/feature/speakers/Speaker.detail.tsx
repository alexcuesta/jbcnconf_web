import { useParams } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import { FC, useEffect, useState } from "react"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { SpeakerType } from "./types"
import { Home } from "@styled-icons/heroicons-solid/Home"
import { Linkedin, Twitter } from "@styled-icons/boxicons-logos"
import { SpeakerContainer } from "./styles"

const SpeakerDetail: FC = () => {
  const { speakerId } = useParams()

  const db = getFirestore()
  const [data, setData] = useState<SpeakerType | null>(null)

  useEffect(() => {
    const getData = () => {
      getDoc(doc(db, "speakers", speakerId as string)).then(querySnapshot => {
        if (querySnapshot.exists()) {
          setData(querySnapshot.data() as SpeakerType)
        }
      })
    }
    getData()

    if (data) {
      document.title = `JBCNConf - Speakers ${data.name} ${data.lastname}`
    }
  }, [db, speakerId, data])

  return (
    <SpeakerContainer fluid>
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <Row>
        {data && (
          <>
            <Col xs={{ span: 3, offset: 1 }}>
              <img
                width="100%"
                src={`https://www.jbcnconf.com/2022/${data.image}`}
                alt={`${data.name} ${data.lastname}`}
              />
              <div id="social-links">
                {data.homepage && (
                  <div>
                    <a
                      href={data.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Home />
                    </a>
                  </div>
                )}
                {data.linkedin && (
                  <div>
                    <a
                      href={data.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin />
                    </a>
                  </div>
                )}
                {data.twitter && (
                  <div>
                    <a
                      href={data.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter />
                    </a>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={7}>
              <h3>
                {data.name} {data.lastname}{" "}
              </h3>
              <h4>
                {data.description}, {data.company}
              </h4>
              <p>{data.biography}</p>
            </Col>
          </>
        )}
      </Row>
    </SpeakerContainer>
  )
}

export default SpeakerDetail
