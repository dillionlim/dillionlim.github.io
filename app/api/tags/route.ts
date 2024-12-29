import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/blog';

export async function GET() {
  const tags = getAllTags();
  return NextResponse.json(tags);
}
