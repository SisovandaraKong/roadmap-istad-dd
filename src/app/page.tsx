"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Handle,
  Position,
  NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";

// Custom Node Component
const RoadmapNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const [isCompleted, setIsCompleted] = useState(data.completed || false);

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
    data.onComplete?.(data.id, !isCompleted);
  };

  const nodeClasses = `
    px-4 py-3 shadow-lg rounded-lg border-2 transition-all duration-200 cursor-pointer
    ${
      isCompleted
        ? "bg-green-100 border-green-400 text-green-800"
        : data.level === "beginner"
        ? "bg-blue-100 border-blue-400 text-blue-800"
        : data.level === "intermediate"
        ? "bg-yellow-100 border-yellow-400 text-yellow-800"
        : "bg-red-100 border-red-400 text-red-800"
    }
    hover:scale-105 hover:shadow-xl
    min-w-[200px] max-w-[250px]
  `;

  return (
    <div className={nodeClasses} onClick={handleToggleComplete}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />

      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isCompleted ? "bg-green-500" : "bg-gray-300"
          }`}
        />
        <span className="font-semibold text-sm uppercase tracking-wide">
          {data.level}
        </span>
      </div>

      <div className="font-bold text-lg mb-1">{data.title}</div>
      <div className="text-sm opacity-80">{data.description}</div>

      {data.skills && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3"
      />
    </div>
  );
};

// Node types
const nodeTypes = {
  roadmapNode: RoadmapNode,
};

export default function RoadmapComponent() {
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());

  // Handle node completion
  const handleNodeComplete = useCallback(
    (nodeId: string, completed: boolean) => {
      setCompletedNodes((prev) => {
        const newSet = new Set(prev);
        if (completed) {
          newSet.add(nodeId);
        } else {
          newSet.delete(nodeId);
        }
        return newSet;
      });
    },
    []
  );

  // Initial nodes configuration for Spring Java
  const initialNodes: Node[] = useMemo(
    () => [
      {
        id: "1",
        type: "roadmapNode",
        position: { x: 400, y: 0 },
        data: {
          id: "1",
          title: "Java Fundamentals",
          description: "OOP, Collections, Streams, Exception Handling",
          level: "beginner",
          skills: ["OOP", "Collections", "Streams", "Exceptions"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "2",
        type: "roadmapNode",
        position: { x: 150, y: 150 },
        data: {
          id: "2",
          title: "Maven & Project Structure",
          description: "Build tools, dependencies, and project setup",
          level: "beginner",
          skills: ["Maven", "pom.xml", "Project Structure"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "3",
        type: "roadmapNode",
        position: { x: 650, y: 150 },
        data: {
          id: "3",
          title: "Spring Core",
          description: "IoC, Beans, Dependency Injection",
          level: "beginner",
          skills: ["IoC", "Beans", "DI"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "4",
        type: "roadmapNode",
        position: { x: 400, y: 300 },
        data: {
          id: "4",
          title: "Spring Boot",
          description: "Auto-configuration, starters, main app",
          level: "intermediate",
          skills: ["Spring Boot", "Starters", "Main Class"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "5",
        type: "roadmapNode",
        position: { x: 150, y: 450 },
        data: {
          id: "5",
          title: "Spring Data JPA",
          description: "Repositories, Entities, CRUD, H2/MySQL",
          level: "intermediate",
          skills: ["JPA", "Repositories", "Entities", "CRUD"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "6",
        type: "roadmapNode",
        position: { x: 650, y: 450 },
        data: {
          id: "6",
          title: "Spring MVC",
          description: "Controllers, REST APIs, Validation",
          level: "intermediate",
          skills: ["Controllers", "REST", "Validation"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "7",
        type: "roadmapNode",
        position: { x: 400, y: 600 },
        data: {
          id: "7",
          title: "Spring Security",
          description: "Authentication, Authorization, JWT",
          level: "advanced",
          skills: ["Security", "JWT", "OAuth2"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "8",
        type: "roadmapNode",
        position: { x: 150, y: 750 },
        data: {
          id: "8",
          title: "Testing Spring Apps",
          description: "JUnit, Mockito, Integration Testing",
          level: "advanced",
          skills: ["JUnit", "Mockito", "Integration Test"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "9",
        type: "roadmapNode",
        position: { x: 650, y: 750 },
        data: {
          id: "9",
          title: "Spring Cloud & Microservices",
          description: "Config, Discovery, API Gateway",
          level: "advanced",
          skills: ["Spring Cloud", "Eureka", "API Gateway"],
          onComplete: handleNodeComplete,
        },
      },
      {
        id: "10",
        type: "roadmapNode",
        position: { x: 400, y: 900 },
        data: {
          id: "10",
          title: "Deployment & DevOps",
          description: "Docker, CI/CD, Cloud Deployment",
          level: "advanced",
          skills: ["Docker", "CI/CD", "Cloud"],
          onComplete: handleNodeComplete,
        },
      },
    ],
    [handleNodeComplete]
  );

  // Initial edges configuration with bigger, smoother labels
  const initialEdges: Edge[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "smoothstep",
      animated: true,
      label: "Start",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e1-3",
      source: "1",
      target: "3",
      type: "smoothstep",
      animated: true,
      label: "Start",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      type: "smoothstep",
      animated: true,
      label: "Spring Boot",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "smoothstep",
      animated: true,
      label: "Spring Boot",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      type: "smoothstep",
      animated: true,
      label: "Data JPA",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e4-6",
      source: "4",
      target: "6",
      type: "smoothstep",
      animated: true,
      label: "MVC",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e4-7",
      source: "4",
      target: "7",
      type: "smoothstep",
      animated: true,
      label: "Security",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e7-8",
      source: "7",
      target: "8",
      type: "smoothstep",
      animated: true,
      label: "Testing",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e7-9",
      source: "7",
      target: "9",
      type: "smoothstep",
      animated: true,
      label: "Microservices",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e8-10",
      source: "8",
      target: "10",
      type: "smoothstep",
      animated: true,
      label: "Deploy",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e9-10",
      source: "9",
      target: "10",
      type: "smoothstep",
      animated: true,
      label: "Deploy",
      labelStyle: { fontSize: 18, fontWeight: "bold", fill: "#000" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
      style: { stroke: "#000", strokeWidth: 3 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Calculate progress
  const progress = useMemo(() => {
    return Math.round((completedNodes.size / initialNodes.length) * 100);
  }, [completedNodes.size, initialNodes.length]);

  return (
    <div className="w-full h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Spring Java Learning Roadmap
            </h1>
            <p className="text-gray-600 mt-1">
              Click on nodes to mark them as completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="text-2xl font-bold text-blue-600">{progress}%</div>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-lg z-10">
        <h3 className="font-semibold mb-2">Difficulty Levels</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded"></div>
            <span className="text-sm">Beginner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded"></div>
            <span className="text-sm">Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
            <span className="text-sm">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
            <span className="text-sm">Completed</span>
          </div>
        </div>
      </div>

      {/* React Flow */}
      <div style={{ width: "100%", height: "calc(100vh - 80px)" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (completedNodes.has(node.id)) return "#10b981";
              switch (node.data?.level) {
                case "beginner":
                  return "#3b82f6";
                case "intermediate":
                  return "#f59e0b";
                case "advanced":
                  return "#ef4444";
                default:
                  return "#6b7280";
              }
            }}
            className="bg-white"
          />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
