import { Button, Card, Col, Flex, Row, Typography, theme } from 'antd'
import { pluginsData } from './pluginsData'

const { Title, Text } = Typography
const { useToken } = theme

export default function Others() {
  const { token } = useToken()

  return (
    <div style={{ width: '100%', overflowX: 'auto', padding: token.paddingMD }}>
      <Row gutter={[16, 16]} className="p-5" style={{ width: '100%', margin: 0, flexWrap: 'wrap' }}>
        {pluginsData.map(plugin => (
          <Col key={plugin.pluginUrl} xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card style={{ height: '100%' }}>
              <Flex vertical style={{ height: '100%' }} gap="middle">
                <Flex justify="center">
                  <Flex
                    justify="center"
                    align="center"
                    style={{
                      width: 80,
                      height: 80,
                      padding: token.paddingXS,
                      backgroundColor: token.colorBgContainer,
                      borderRadius: token.borderRadiusLG
                    }}
                  >
                    <img
                      src={plugin.logo}
                      alt={`${plugin.title} logo`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Flex>
                </Flex>

                <Flex vertical gap="small" flex={1}>
                  <Title level={5} style={{ margin: 0, textAlign: 'center' }}>
                    {plugin.title}
                  </Title>
                  <Text
                    type="secondary"
                    style={{
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textAlign: 'justify',
                      hyphens: 'auto'
                    }}
                  >
                    {plugin.description}
                  </Text>
                </Flex>

                <Flex justify="center" style={{ marginTop: 'auto' }}>
                  <Text type="secondary">Active Installs: {plugin.activeInstalls}</Text>
                </Flex>
                <Button key="go-to-plugin" type="link" href={plugin.pluginUrl} target="_blank">
                  Go to Plugin
                </Button>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
