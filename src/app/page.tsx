import About from "@/components/About";
import AudioRecordPage from "@/components/Audio";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AOSA - Audio Sentiment Analysis",
  description: "AOSA is a web application that uses machine learning to analyze the sentiment of audio files. It is designed to help users understand the emotions and tone of the audio they upload.",
};

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      <Hero />
      <AudioRecordPage />
      <Features />
      <About />
      <CallToAction />
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      <Faq />
      <Team />
      <HomeBlogSection posts={posts} />
      <Contact />
      {/* <Clients /> */}
    </main>
  );
}
