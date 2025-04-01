'use client';

import { useState, useEffect } from 'react';
import { Section, Cell, List, Button, Avatar } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { Link } from '@/components/Link/Link';
import { retrieveLaunchParams } from '@telegram-apps/sdk';



export default function ValidatePage() {
    const [validationResult, setValidationResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //const { initDataRaw } = retrieveLaunchParams();

    const webApp = typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : null;

    useEffect(() => {
        if (!webApp) {
            setError('请在Telegram中打开此Mini App');
            return;
        }

        const validateInitData = async () => {
            setIsLoading(true);
            try {
                const initData = webApp.initData;

                if (!initData) {
                  throw new Error('未找到initData');
                }

                const response = await fetch('/api/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ initData }),
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message);
                    throw new Error(data.message);
                }

                setValidationResult(data);
                setError(null);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        validateInitData();
    }, [webApp]);

    return (
        <Page>
            <List>
                <Section header="验证结果">
                    {isLoading && <Cell>验证中...</Cell>}

                    {error && (
                        <Cell
                            subtitle={error}
                            style={{ color: 'var(--tg-theme-destructive-text-color)' }}
                        >
                            验证失败
                        </Cell>
                    )}

                    {validationResult?.success && validationResult.user && (
                        <>
                            <Cell
                                before={
                                    validationResult.user.photo_url ? (
                                        <Avatar src={validationResult.user.photo_url} />
                                    ) : undefined
                                }
                                subtitle={`@${validationResult.user.username || '无用户名'}`}
                            >
                                {validationResult.user.first_name} {validationResult.user.last_name || ''}
                            </Cell>
                            <Cell subtitle="验证状态">✅ 签名验证成功</Cell>
                        </>
                    )}
                </Section>

                <Section>
                    <Link href="/">
                        <Button>返回首页</Button>
                    </Link>
                </Section>
            </List>
        </Page>
    );
}