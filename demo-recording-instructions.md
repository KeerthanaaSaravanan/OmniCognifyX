# OmniMind Orchestrator: Demo Recording Guide

This guide provides instructions for recording a high-quality, compelling demo video for the hackathon submission.

## OBS (Open Broadcaster Software) Settings

- **Resolution**: `1920x1080`
- **Framerate (FPS)**: `60` for smooth animations.
- **Audio Mic**: Use a high-quality external microphone if possible.
  - Add a `Noise Suppression` filter (RNNoise is good quality) to reduce background noise.
  - Add a `Compressor` filter to even out your voice volume.
- **Video Encoder**: `x264` (software) for better quality if your CPU can handle it, or `NVENC` / `AMF` (hardware) for better performance.
- **Recording Format**: `MKV` (This prevents data loss if OBS crashes. You can remux to MP4 later via `File -> Remux Recordings`).

## Screen Recording Steps

### Scene 1: Introduction & Landing Page (0:00 - 0:20)

1.  **Start Recording.**
2.  **Camera Focus**: Full screen on the browser window, showing the app's landing page (`/`).
3.  **Action**: Slowly scroll down the page to showcase the UI.
4.  **Voiceover Cue**: "Introducing OmniMind Orchestrator, an AI-powered platform that simulates the automation and orchestration of complex business workflows, inspired by IBM's watsonx."
5.  **Action**: Click the "Go to Dashboard" button.

### Scene 2: Dashboard Overview (0:20 - 0:45)

1.  **Camera Focus**: Full dashboard view.
2.  **Action**: Briefly hover over the stats cards (Total Workflows, Completed, etc.) and the "Recent Workflows" list.
3.  **Voiceover Cue**: "The central dashboard provides a complete overview of all our automated processes, showing real-time status and recent activity."
4.  **Action**: Move the cursor to the sidebar and hover over the different navigation items (Workflows, Data Sources, etc.).
5.  **Voiceover Cue**: "Users can manage their workflows, connect data sources, and configure settings, all from a unified interface."

### Scene 3: Activating Demo Mode & Orchestration (0:45 - 1:30)

1.  **Camera Focus**: Zoom in on the top-right header area.
2.  **Action**: Click the **"Demo Mode"** toggle. The "Recording Mode" banner should appear.
3.  **Voiceover Cue**: "Now, let's activate Demo Mode to simulate a live orchestration sequence. This will trigger a full workflow automatically."
4.  **Camera Focus**: The app should auto-navigate to the Orchestration Visualizer. Keep the focus on the full page.
5.  **Action**: Let the animation play out. The nodes should light up in sequence.
6.  **Voiceover Cue**: "As you can see, IBM watsonx Orchestrate is now executing the workflow. The `OrchestrationVisualizer` shows our AI agents—DataSense, TaskFlow, InsightSynth, and GovernGuard—collaborating in real-time."
7.  **Action**: While the visualizer runs, move the cursor down to the `Flow Console`.
8.  **Voiceover Cue**: "...and the Flow Console displays live, auditable logs, showing each step of the process, from pulling data with watsonx.data, processing with watsonx.ai, and ensuring compliance with watsonx.governance."

### Scene 4: The Cognitive Orchestration Loop (1:30 - 2:30)

1.  **Camera Focus**: Navigate to the "Cognitive Loop" page via the sidebar.
2.  **Action**: Let the initial analysis animation play.
3.  **Voiceover Cue**: "But the real power of OmniMind lies in our Cognitive Orchestration Loop, or COL. This is a self-optimizing meta-agent that analyzes workflow performance."
4.  **Action**: Hover over the "Optimization Suggestions" card.
5.  **Voiceover Cue**: "It identifies bottlenecks and suggests concrete, actionable improvements, like reordering data processing for a 17% performance boost."
6.  **Action**: Click the "Apply" button on one of the suggestions.
7.  **Voiceover Cue**: "With a single click, we can apply the optimization. The system then re-evaluates, showing immediate improvements in our overall efficiency metrics. This is autonomous AI agents orchestrating themselves."

### Scene 5: Composable Agent Generation (2:30 - 2:50)

1.  **Camera Focus**: Navigate to the "Create Workflow" page.
2.  **Action**: For demonstration purposes (as the UI isn't built yet), briefly show the `generate-agent-manifest-flow.ts` code file in your IDE.
3.  **Voiceover Cue**: "Our platform is also composable. With our agent generation endpoint, developers can define new agent manifests, which pass through a watsonx.governance pre-check, ensuring that new automations are compliant from the start."

### Scene 6: Conclusion (2:50 - 3:00)

1.  **Camera Focus**: Return to the main dashboard page.
2.  **Action**: Have the cursor resting over the efficiency chart.
3.  **Voiceover Cue**: "OmniMind Orchestrator, powered by IBM watsonx, doesn't just automate tasks—it creates intelligent, self-optimizing systems. Thank you."
4.  **Stop Recording.**
