'use client';

import { Section, Cell, List, Avatar, Card} from '@telegram-apps/telegram-ui';
import { postEvent } from '@telegram-apps/sdk';
import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page';


// 开发者信息
const DEVELOPER_USERNAME = 'vincent2025';
const DEVELOPER_NAME = 'Vincent';

export default function Home() {
    postEvent('web_app_set_header_color', { color_key: 'bg_color' });
    postEvent('web_app_expand');

    return (
        <Page back={false}>
            <List>
                <Section>
                    <Card style={{
                        padding: '20px',
                        background: 'linear-gradient(135deg, #0088CC, #005F8C)',
                        color: '#ffffff',
                        borderRadius: '12px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '16px'
                        }}>
                            <Avatar
                                size={48}
                                style={{ border: '1px solid white' }}
                            >{DEVELOPER_NAME}</Avatar>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '24px' }}>TON Coding Challenge 2025</h2>
                                <p style={{ margin: '4px 0 0 0', opacity: 0.8 }}>
                                    开发者: @{DEVELOPER_USERNAME}
                                </p>
                            </div>
                        </div>
                        <p style={{ margin: '16px 0 0 0', fontSize: '16px', opacity: 0.8 }}>
                            这是一个基于TON Coding Challenge 2025 Round 2 Mini App的示例应用。
                            <br />
                        </p>
                        <p></p>
                        <Link href="/validate">
                            <Cell
                                subtitle="验证Telegram WebApp initData签名"
                                style={{ backgroundColor: 'rgba(0, 122, 255, 0.1)' }}
                                before={
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(0, 122, 255, 0.2)'
                                    }}>
                                        ✅
                                    </div>
                                }
                            >
                                验证initData
                            </Cell>
                        </Link>
                    </Card>
                </Section>
            </List>
        </Page>
    );
}