import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// 使用环境变量获取bot token
const BOT_TOKEN = process.env.BOT_TOKEN || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData } = body;
    
    if (!initData || typeof initData !== 'string') {
      return NextResponse.json(
        { success: false, message: '未提供有效的initData' }, 
        { status: 400 }
      );
    }
    
    // 解析initData
    const parsedData = parseInitData(initData);
    
    // 验证签名
    const isValid = validateSignature(parsedData, BOT_TOKEN);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: '签名验证失败' }, 
        { status: 401 }
      );
    }
    
    // 获取用户数据
    let user = null;
    if (parsedData.user) {
      try {
        user = JSON.parse(parsedData.user);
      } catch (e) {
        return NextResponse.json(
          { success: false, message: '无法解析用户数据' }, 
          { status: 400 }
        );
      }
    }
    
    // 返回验证结果和用户信息
    return NextResponse.json({
      success: true,
      user: user,
      message: '验证成功'
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: `验证过程出错: ${error.message}` }, 
      { status: 500 }
    );
  }
}

// 解析initData字符串成对象
function parseInitData(initDataString: string) {
  const result: Record<string, string> = {};
  const pairs = initDataString.split('&');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    result[key] = decodeURIComponent(value || '');
  });
  
  return result;
}

// 验证签名
function validateSignature(data: Record<string, string>, botToken: string): boolean {
  if (!botToken) {
    console.error('未设置BOT_TOKEN环境变量');
    return false;
  }
  
  // 获取并删除签名
  const hash = data.hash;
  const dataToCheck = { ...data };
  delete dataToCheck.hash;
  
  // 按字母顺序排序键
  const dataCheckString = Object.keys(dataToCheck)
    .sort()
    .map(key => `${key}=${dataToCheck[key]}`)
    .join('\n');
  
  // 创建HMAC-SHA256签名
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();
    
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  
  return signature === hash;
}