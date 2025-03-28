import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  ActivityIndicator, 
  Pressable,
  View 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

async function generateQuestion(jobTitle: string): Promise<Question> {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_TOGETHER_API_URL || 'https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.EXPO_PUBLIC_TOGETHER_MODEL || "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        messages: [{
          role: "system",
          content: "You are a technical interviewer. Generate interview questions in JSON format. Do not include markdown formatting or code blocks in your response. Each time you're asked, generate a different question."
        }, {
          role: "user",
          content: `Generate a new and unique multiple choice question that might be asked in a ${jobTitle} interview. 
          Choose from various topics relevant to the role.
          Return it in this JSON format:
          {
            "question": "the question text",
            "options": ["option1", "option2", "option3", "option4"],
            "correctAnswer": 0,
            "explanation": "why this is the correct answer"
          }`
        }],
        temperature: Number(process.env.EXPO_PUBLIC_TOGETHER_TEMPERATURE) || 0.9,
        max_tokens: Number(process.env.EXPO_PUBLIC_TOGETHER_MAX_TOKENS) || 500
      })
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    try {
      const parsedQuestion = JSON.parse(data.choices[0].message.content);
      
      if (!parsedQuestion.question || 
          !Array.isArray(parsedQuestion.options) || 
          parsedQuestion.options.length !== 4 ||
          typeof parsedQuestion.correctAnswer !== 'number' ||
          !parsedQuestion.explanation) {
        throw new Error('Invalid question format');
      }
      
      return parsedQuestion;
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.log('Raw content:', data.choices[0].message.content);
      throw new Error('Failed to parse question JSON');
    }
  } catch (error) {
    console.error('Error details:', error);
    throw error;
  }
}

export default function ExploreScreen() {
  const [jobTitle, setJobTitle] = useState('');
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle.trim()) return;
    
    setLoading(true);
    setError(null);
    setQuestion(null);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const newQuestion = await generateQuestion(jobTitle);
      setQuestion(newQuestion);
    } catch (err) {
      setError('Failed to generate question');
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const newQuestion = await generateQuestion(jobTitle);
      setQuestion(newQuestion);
    } catch (err) {
      setError('Failed to generate question');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion(null);
    setJobTitle('');
    setSelectedAnswer(null);
    setShowExplanation(false);
    setError(null);
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (question) {
    return (
      <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.jobTitle}>{jobTitle} Interview</ThemedText>
          </ThemedView>

          <ThemedView style={styles.questionContainer}>
            <ThemedText style={styles.questionText}>{question.question}</ThemedText>
            
            {question.options.map((option, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedAnswer(index);
                  setShowExplanation(true);
                }}
                style={({ pressed }) => [
                  styles.option,
                  selectedAnswer === index && styles.selectedOption,
                  pressed && styles.optionPressed
                ]}
              >
                <ThemedText style={[
                  styles.optionText,
                  selectedAnswer === index && 
                  (index === question.correctAnswer ? styles.correctAnswer : styles.wrongAnswer)
                ]}>
                  {option}
                </ThemedText>
              </Pressable>
            ))}

            {showExplanation && (
              <ThemedView style={styles.explanation}>
                <ThemedText style={styles.explanationText}>
                  {question.explanation}
                </ThemedText>
              </ThemedView>
            )}

            <ThemedView style={styles.buttonContainer}>
              <Pressable 
                onPress={handleNextQuestion}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed
                ]}
              >
                <ThemedText style={styles.buttonText}>
                  Next Question
                </ThemedText>
              </Pressable>

              <Pressable 
                onPress={handleReset}
                style={({ pressed }) => [
                  styles.button,
                  styles.resetButton,
                  pressed && styles.buttonPressed
                ]}
              >
                <ThemedText style={[styles.buttonText, styles.resetButtonText]}>
                  Change Job Title
                </ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Interview Question Generator</ThemedText>
        
        <TextInput
          style={styles.input}
          placeholder="Enter job title (e.g., React Developer)"
          value={jobTitle}
          onChangeText={setJobTitle}
          onSubmitEditing={handleGenerate}
        />

        <ThemedView style={styles.buttonContainer}>
          <Pressable 
            onPress={handleGenerate}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]}
          >
            <ThemedText style={styles.buttonText}>
              Generate Question
            </ThemedText>
          </Pressable>
        </ThemedView>

        {error && (
          <ThemedText style={styles.error}>{error}</ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    gap: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0A84FF',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#0A84FF',
  },
  questionContainer: {
    gap: 12,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  optionPressed: {
    opacity: 0.7,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#0A84FF',
  },
  optionText: {
    fontSize: 16,
  },
  correctAnswer: {
    color: '#34C759',
  },
  wrongAnswer: {
    color: '#FF3B30',
  },
  explanation: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  explanationText: {
    fontSize: 14,
  },
  error: {
    color: '#FF3B30',
  },
});
