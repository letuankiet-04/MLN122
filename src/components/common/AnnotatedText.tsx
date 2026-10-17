import React, { useMemo } from 'react';
import { GLOSSARY_TERMS } from '../../content/glossaryData';
import { TermTooltip } from './TermTooltip';
import { GlossaryTerm } from '../../types/textbook';

interface AnnotatedTextProps {
  text: string;
  onNavigateToSection?: (sectionId: string) => void;
  className?: string;
}

interface TermMatcher {
  pattern: RegExp;
  term: GlossaryTerm;
}

export const AnnotatedText: React.FC<AnnotatedTextProps> = ({
  text,
  onNavigateToSection,
  className = '',
}) => {
  // Build sorted matchers
  const matchers: TermMatcher[] = useMemo(() => {
    // Sort terms by length in descending order so longer phrases match first
    const sorted = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);

    // List of custom alias mappings if appropriate
    const list: TermMatcher[] = [];

    sorted.forEach((term) => {
      // Escape special characters in term
      const escaped = term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Case-insensitive boundary match
      list.push({
        pattern: new RegExp(`(${escaped})`, 'gi'),
        term,
      });

      // Special alias: "Hàng hóa sức lao động" maps to "Sức lao động"
      if (term.id === 'suc-lao-dong') {
        list.push({
          pattern: new RegExp(`(hàng hóa sức lao động)`, 'gi'),
          term,
        });
      }
    });

    return list;
  }, []);

  const renderedContent = useMemo(() => {
    if (!text || typeof text !== 'string') return text;

    // We build segments of { text, term?: GlossaryTerm }
    let segments: { text: string; term?: GlossaryTerm }[] = [{ text }];

    let totalAnnotatedInBlock = 0;
    const MAX_ANNOTATIONS_PER_BLOCK = 3;
    const annotatedTermCount: Record<string, number> = {};

    matchers.forEach(({ pattern, term }) => {
      // Don't overwhelm reading: max 3 terms per paragraph and max 1 per specific term
      if (totalAnnotatedInBlock >= MAX_ANNOTATIONS_PER_BLOCK) return;
      if ((annotatedTermCount[term.id] || 0) >= 1) return;

      const nextSegments: { text: string; term?: GlossaryTerm }[] = [];

      segments.forEach((seg) => {
        // If already matched a term, keep as is
        if (seg.term) {
          nextSegments.push(seg);
          return;
        }

        if (totalAnnotatedInBlock >= MAX_ANNOTATIONS_PER_BLOCK || (annotatedTermCount[term.id] || 0) >= 1) {
          nextSegments.push(seg);
          return;
        }

        const parts = seg.text.split(pattern);
        if (parts.length === 1) {
          nextSegments.push(seg);
          return;
        }

        parts.forEach((part) => {
          if (!part) return;

          // Odd indices in split(regex) with capturing group are the matched substrings
          if (pattern.test(part) && (annotatedTermCount[term.id] || 0) < 1 && totalAnnotatedInBlock < MAX_ANNOTATIONS_PER_BLOCK) {
            nextSegments.push({ text: part, term });
            annotatedTermCount[term.id] = (annotatedTermCount[term.id] || 0) + 1;
            totalAnnotatedInBlock++;
          } else {
            nextSegments.push({ text: part });
          }
        });
      });

      segments = nextSegments;
    });

    return segments.map((seg, idx) => {
      if (seg.term) {
        return (
          <TermTooltip
            key={idx}
            term={seg.term}
            onNavigateToSection={onNavigateToSection}
          >
            {seg.text}
          </TermTooltip>
        );
      }
      return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
    });
  }, [text, matchers, onNavigateToSection]);

  return <span className={className}>{renderedContent}</span>;
};
