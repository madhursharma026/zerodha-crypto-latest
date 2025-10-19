import { Button, Card, Nav } from 'react-bootstrap'
import { BsGraphUp } from 'react-icons/bs'
import styles from './pricefeeds.module.css'

export default function Developers() {
  return (
    <>
      <div className={`mt-5 p-md-5 p-4 ${styles.developerContainer}`}>
        <div
          className="row py-5"
          style={{
            maxWidth: '1300px',
            margin: 'auto',
          }}
        >
          <div className="col-lg-6 py-lg-5 d-flex flex-column justify-content-center">
            <h6 className="d-flex align-items-center">
              <BsGraphUp className="text-primary me-2" />
              DEVELOPERS
            </h6>
            <h1 className="fw-normal pe-5" style={{ fontSize: '40px' }}>
              Simple integration <br /> at your fingertips
            </h1>
          </div>

          <div className="col-lg-6 py-lg-5 d-flex flex-column justify-content-center mt-lg-0 mt-5">
            <p className="fs-5 pt-4">
              Implement real-time pricing in minutes
              <br /> with these pre-built examples.
            </p>
            <div>
              <Button
                variant="dark"
                className="rounded-pill px-4 py-2 fw-semibold"
              >
                Get Started
              </Button>

              <Button
                variant="light"
                className="ms-sm-3 rounded-pill mt-sm-0 mt-2 border border-secondary px-4 py-2 fw-semibold"
              >
                Explore Price Feeds
              </Button>
            </div>
          </div>

          <Card
            className={`rounded-4 mt-5 shadow-sm border-0 ${styles.editorCard}`}
          >
            <Nav
              variant="tabs"
              defaultActiveKey="evm"
              className={styles.editorTabs}
            >
              <Nav.Item>
                <Nav.Link eventKey="evm">EVM</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="svm">SVM</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="aptos">Aptos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sui">Sui</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="offchain">Off-Chain</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Code Block */}
            <pre className={styles.codeBlock}>
              <code>
                {`import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract ExampleContract {
    IPyth pyth;

    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }

    function getEthUsdPrice(
        bytes[] calldata priceUpdateData
    ) public payable returns (PythStructs.Price memory) {
        uint fee = pyth.getUpdateFee(priceUpdateData);
        pyth.updatePriceFeeds{value: fee}(priceUpdateData);

        bytes32 priceID = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
        return pyth.getPrice(priceID);
    }
}`}
              </code>
            </pre>
          </Card>
        </div>
      </div>
    </>
  )
}
