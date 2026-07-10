import {
  PlaceholderBox,
  CaseHero,
  StatsStrip,
  CaseSection,
  CenteredSection,
  UpNext,
} from "../CaseSections";
import BrandRow from "../../site/BrandRow";
import caseStyles from "../case.module.css";
import styles from "./KnowledgeOs.module.css";

/**
 * Knowledge OS case-study content (Figma "Knowledge OS case study
 * template", node 6759:5781). Copy transcribed verbatim from the
 * template; all media areas render as labeled wireframe placeholders
 * per the annotations until real imagery lands.
 */

/** 480x322 media box with the template's two caption bars beneath
 *  (Figma 6759:5940 figure pattern). */
function MediaFigure() {
  return (
    <div className={styles.figure}>
      <PlaceholderBox aspect="480 / 322" />
      <div className={styles.captions}>
        <PlaceholderBox aspect="480 / 25" label="// CAPTION_PENDING" />
        <PlaceholderBox aspect="434 / 25" label="" />
      </div>
    </div>
  );
}

export default function KnowledgeOs() {
  return (
    <>
      <CaseHero
        eyebrow="KNOWLEDGE HUB · PERSONAL KNOWLEDGE OS"
        title="Designing a personal AI that reads 300 sources a week, so I don't have to."
        intro={[
          "In AI, new work outpaces anyone's reading speed. Knowledge Hub is a personal knowledge OS built solo and still shipping weekly",
          "My capture pipeline ingests 300-400 sources a week into a vector corpus growing to over 4,000 links, and an AI chat interface that answers questions from that corpus with citations instead of confidence.",
        ]}
      />

      <StatsStrip />

      <BrandRow />

      <CaseSection
        heading="The field moves faster than reading speed."
        lede={[
          "Roughly 300-400 relevant sources arrive every week. A person can deeply read a fraction of that, and skimming drops the things that matter most: connections and contradictions between sources, the topics nobody's covering yet.",
        ]}
        media={
          <div className={styles.quadRow}>
            <PlaceholderBox aspect="230 / 209" />
            <PlaceholderBox aspect="230 / 209" />
            <PlaceholderBox aspect="230 / 209" />
            <PlaceholderBox aspect="230 / 209" />
          </div>
        }
      />

      <CaseSection
        heading="Saving & bookmarking links isn't the same as knowing things."
        lede={[
          "Capture tools make piles, and piles rot: you can't see what's gone stale, what contradicts what, or what's missing entirely.",
          "For a designer whose positioning depends on staying current in AI, working from stale knowledge is a professional risk.",
          "The capture layer here is still the same Telegram bot the project started with, send it a URL and seconds later the source is summarized, scored, and embedded. What changed over the last four months is everything after capture.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <MediaFigure />
            <MediaFigure />
          </div>
        }
      />

      <CaseSection
        heading="Show the conclusion and how much to trust it"
        lede={[
          "Every extraction carries a score with an inline reason, a novelty score against everything already saved, a record of what the model failed to extract, all surfaced where you read, not in logs. A failed extraction shows up on the row it failed on, with a retry next to it.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <MediaFigure />
            <MediaFigure />
          </div>
        }
      />

      <CaseSection
        heading="A corpus that admits what it lacks."
        lede={[
          "Every source carries a decay state (active, aging, stale), and an on-demand gap-analysis pass reports what the corpus is missing and where attention is shifting.",
          "The system doesn't just describe what it knows; it flags what it doesn't.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <MediaFigure />
            <MediaFigure />
          </div>
        }
      />

      <CaseSection
        heading="Chat that answers from the library, not the internet."
        lede={[
          "The daily interface is a conversation with the corpus.",
          "A question gets embedded, the system over-fetches 20 to 40 candidates from the vector store, a reranker re-scores them against the question, and the top ten go to the model with one standing rule: ground every claim in a named saved source, and say so when the corpus doesn't cover it.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <MediaFigure />
            <MediaFigure />
          </div>
        }
      />

      <CaseSection
        heading="Conversations are a graph, not a scroll."
        lede={[
          "Editing a question or regenerating an answer never overwrites anything: it creates a sibling branch, with a version pager to walk the alternatives and a branch-from-here on any message.",
          "Long chats get a table of contents, an outline rail with AI-generated topic labels, bookmarks, and find-in-conversation.",
          "Folders organize chats, and an auto-sort reads every unfiled conversation and proposes a filing plan and the new-chat screen suggests the topics you actually ask about, extracted from your own question history.",
          "And when there is a genuine gap in my saved links the research tool aided by AI topic suggestions searches the internet  for new content to fill those gaps.",
        ]}
        media={
          <>
            <div className={caseStyles.mediaPair}>
              <MediaFigure />
              <MediaFigure />
            </div>
            <div className={caseStyles.mediaPair}>
              <MediaFigure />
              <MediaFigure />
            </div>
          </>
        }
      />

      <CenteredSection
        heading="Production-deployed and compounding"
        paragraphs={[
          "Knowledge Hub is live and in daily use: a corpus past 4,000 sources growing by 300-400 a week, a chat interface grounded in it, agents fired on demand.",
          "By mid-May the agents had generated 3,400+ signals over 1,900 saved sources, nearly two machine observations per source, and the first gap they caught was one my own reading had missed  entirely: five security subtopics I'd rated maximum priority, eight links between them.",
        ]}
        emphasis="A year ago I could have designed this in Figma, getting any of it into production would have been just a dream. But today with all the new tools it shipped in four months, solo, and it's still shipping."
      />

      {/* Figma's UP NEXT block was un-updated (stale ChatVET copy); named
          for the actual destination so link text matches. */}
      <UpNext
        title="Platform One AI Assistant & Chat Bot"
        desc="Designing an AI assistant projected to cut support tickets by up to 40%"
        href="/case-studies/platform-one"
      />
    </>
  );
}
