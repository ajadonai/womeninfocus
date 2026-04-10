import { getSiteSettings } from '@/sanity/lib/fetch';
import { SurveyContent } from '@/components/SurveyContent';

export const revalidate = 60;

export default async function SurveyPage() {
  const settings = await getSiteSettings();
  const surveyUrl = settings?.surveyUrl || null;

  return <SurveyContent surveyUrl={surveyUrl} />;
}
